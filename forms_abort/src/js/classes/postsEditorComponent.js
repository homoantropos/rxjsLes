import viewClassBinder from "../services/viewClassBinder";
import {ajax} from "rxjs/internal/ajax/ajax";
import config from "../config/config";
import {getDefaultObserver} from "../utils/getDefaultObserver";
import {map, mergeAll, tap} from "rxjs";
import postsService from "../services/postsService";
import store from "../services/store";

class PostsEditorComponent {
    posts;

    submitButton;

    postForm;

    postTitle;

    postAuthor;

    postBody;

    constructor() { }

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

        const createPostSubs = store
            .storePost(post)
            .subscribe(
                getDefaultObserver(
                    createPostSubs,
                    '',
                    (posts) => {
                        if(post) {
                            this.postForm.reset();
                        }
                    }
                )
            );
    }

    bindEventListeners() {
        this.submitButton && this.submitButton.addEventListener('click', this.createPost.bind(this));
    }

    removeEventListeners() {
        this.submitButton && this.submitButton.removeEventListener('click', this.createPost.bind(this));
    }

    _componentClassConfig = [ 'submitButton', 'postForm', 'postTitle', 'postAuthor', 'postBody']
}

const postsEditor = new PostsEditorComponent();

export default postsEditor;