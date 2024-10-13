import viewClassBinder from "../services/viewClassBinder";
import {getDefaultObserver} from "../utils/getDefaultObserver";
import store from "../store/store";
import {domQueries} from "../config/domQueries";
import loaderSpinner from "./loaderComponent";
import {takeUntil} from "rxjs";
import {offline$} from "../../forms_abort";

class PostsEditorComponent {
    editedPost;

    posts;

    submitButton;

    postForm;

    postTitle;

    postAuthor;

    postBody;

    constructor() {
    }

    initComponent() {
        viewClassBinder.createClassPropsDueViewConfig().bind(this)(this._componentClassConfig);

        this.bindEventListeners();
    }

    createPost(event) {
        event.preventDefault();

        this.editedPost = {
            title: this.postTitle.value,
            author: this.postAuthor.value,
            body: this.postBody.value
        }

        loaderSpinner.toggleLoader(true);

        const createPostSubs = store
            .storePost(this.editedPost)
            .pipe(
                takeUntil(offline$)
            )
            .subscribe(
                getDefaultObserver(
                    createPostSubs,
                    'post save',
                    this.successCreatePostHandler.bind(this),
                    this.errorCreatePostHandler.bind(this),
                    this.onCompleteHandler.bind(this)
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
            this.editedPost.id = post.id;

            this.postForm.reset();

            loaderSpinner.toggleLoader(false);
        }
    }


    errorCreatePostHandler(error) {
        console.error(error);

        loaderSpinner.toggleLoader(false);
    }

    onCompleteHandler() {
        console.log('oncomplete: ');

        !this.editedPost.id ? alert('You value doesn\'t saved please try again') : this.postForm.reset();

        loaderSpinner.toggleLoader(false);
    }

    _componentClassConfig = [
        domQueries.submitButton,
        domQueries.postForm,
        domQueries.postTitle,
        domQueries.postAuthor,
        domQueries.postBody
    ]
}

const postsEditor = new PostsEditorComponent();

export default postsEditor;