import postsService from "./postsService";
import {getDefaultObserver} from "../utils/getDefaultObserver";
import {catchError, map, Subject, tap, throwError} from "rxjs";

class Store {
    posts = new Map();

    logPosts = new Subject();

    storePost(post) {
        return postsService
            .createPost(post)
            .pipe(
                tap((post) => this.setPost(post)),
                catchError((err) => throwError(err))
            )
    }

    setPost(post) {
        this.posts.set(post.id, post);

        this.logPosts.next(this.posts);
    }

    setPosts(posts) {
        if (Array.isArray(posts)) {
            let i = 0;

            const postsLength = posts.length;

            while (i < postsLength) {
                const post = posts[i];

                store.posts.set(post.id, post);

                i++
            }
        }
    }

    retrievePosts() {
        this.posts.clear();

        const getPostsSub = postsService
            .getPosts()
            .subscribe(
                getDefaultObserver(
                    getPostsSub,
                    '',
                    this.setPosts.bind(this)
                )
            );
    }
}

const store = new Store();

export default store;