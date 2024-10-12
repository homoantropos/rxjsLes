import postsService from "./postsService";
import {getDefaultObserver} from "../utils/getDefaultObserver";
import {catchError, map, throwError} from "rxjs";

class Store {
    posts = new Map();

    storePost(post) {
        return postsService
            .createPost(post)
            .pipe(
                map((post) => {
                    this.setPost(post);

                    return post;
                }),
                catchError((err) => throwError(err))
            )
    }

    setPost(post) {
        this.posts.set(post.id, post);
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

            console.log('posts: ', store.posts);
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