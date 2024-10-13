import viewClassBinder from "../services/viewClassBinder";
import {getDefaultObserver} from "../utils/getDefaultObserver";
import store from "../services/store";
import {domQueries} from "../config/domQueries";
import loaderSpinner from "./loaderComponent";

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

        loaderSpinner.toggleLoader(true);

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

            loaderSpinner.toggleLoader(false);
        }
    }


    errorCreatePostHandler(error) {
        console.error(error);

        loaderSpinner.toggleLoader(false);
    }

    _componentClassConfig = [
        domQueries.submitButton,
        domQueries.postForm,
        domQueries.postTitle,
        domQueries.postAuthor,
        domQueries.postBody,
        domQueries.searchForm,
        domQueries.searchQueryInput,
        domQueries.foundContent
    ]
}

const postsEditor = new PostsEditorComponent();

export default postsEditor;