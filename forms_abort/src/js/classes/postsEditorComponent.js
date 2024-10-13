import viewClassBinder from "../services/viewClassBinder";
import {ajax} from "rxjs/internal/ajax/ajax";
import config from "../config/config";
import {getDefaultObserver} from "../utils/getDefaultObserver";
import {delay, map, mergeAll, tap} from "rxjs";
import postsService from "../services/postsService";
import store from "../services/store";
import {domQueries} from "../config/domQueries";

class PostsEditorComponent {
    posts;

    submitButton;

    postForm;

    postTitle;

    postAuthor;

    postBody;

    searchForm;

    searchQueryInput;

    foundContent;

    constructor() {
    }

    initComponent() {
        viewClassBinder.createClassPropsDueViewConfig().bind(this)(this._componentClassConfig);

        this.bindEventListeners();
    }

    createPost(event) {
        event.preventDefault();

        const post = {
            title: this.postTitle.value,
            author: this.postAuthor.value,
            body: this.postBody.value
        }

        this.loader.style.display = 'flex';

        const createPostSubs = store
            .storePost(post)
            .subscribe(
                getDefaultObserver(
                    createPostSubs,
                    '',
                    this.successCreatePostHandler.bind(this),
                    this.errorCreatePostHandler.bind(this),
                )
            );
    }

    bindEventListeners() {
        this.submitButton && this.submitButton.addEventListener('click', this.createPost.bind(this));
    }

    removeEventListeners() {
        this.submitButton && this.submitButton.removeEventListener('click', this.createPost.bind(this));
    }

    successCreatePostHandler(post) {
        if (post) {
            this.postForm.reset();
            this.loader.style.display = 'none';
        }
    }


    errorCreatePostHandler(error) {
        console.error(error);
        this.loader.style.display = 'none';
    }

    _componentClassConfig = [
        domQueries.submitButton,
        domQueries.postForm,
        domQueries.postTitle,
        domQueries.postAuthor,
        domQueries.postBody,
        domQueries.searchForm,
        domQueries.searchQueryInput,
        domQueries.foundContent,
        domQueries.loader
    ]
}

const postsEditor = new PostsEditorComponent();

export default postsEditor;