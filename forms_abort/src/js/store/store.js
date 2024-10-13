import postsService from "../services/postsService";
import {getDefaultObserver} from "../utils/getDefaultObserver";
import {catchError, Subject, tap, throwError} from "rxjs";
import {configureStore} from "@reduxjs/toolkit";
import {ADD_POST, addPost, CLEAR, clearStore, DELETE_POST, SET_POSTS, setPosts, UPDATE_POST} from "./actions";

class Store {
    store;

    initialState = { posts: new Map() };

    logPosts = new Subject();

    constructor() {
        this.store = configureStore({reducer: this.postsReducer});
    }

    postsReducer = (state = this.initialState, action) => {
        switch (action.type) {
            case SET_POSTS: {
                const posts = action.payload;

                return { posts: posts };
            }
            case CLEAR: {
                return { posts: new Map() };
            }
            case ADD_POST: {
                const post = action.payload;

                const nextMap = new Map(state.posts);

                nextMap.set(post.id, post);

                return { posts: nextMap };
            }
            case UPDATE_POST: {

                break;
            }
            case DELETE_POST: {

                break;
            }
            default: {

                break;
            }
        }
    }

    storePost(post) {
        return postsService
            .createPost(post)
            .pipe(
                tap((post) => this.setPost(post)),
                catchError((err) => throwError(err))
            )
    }

    setPost(post) {
        this.store.dispatch(addPost(post));

        this.logPosts.next(this.store.getState());
    }

    setPosts(posts) {
        if (Array.isArray(posts)) {
            let i = 0;

            const postsLength = posts.length;

            const storePosts = new Map();

            while (i < postsLength) {
                const post = posts[i];

                storePosts.set(post.id, post);

                i++
            }

            this.store.dispatch(setPosts(storePosts));
        }
    }

    retrievePosts() {
        this.store.dispatch(clearStore());

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

    findPostById(stringId) {
        if(typeof stringId !== 'string') stringId = String(stringId);

        return this.store.getState().posts.get(stringId);
    }
}

const store = new Store();

export default store;