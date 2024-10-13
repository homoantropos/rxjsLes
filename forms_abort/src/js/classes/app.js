import store from "../services/store";
import loaderComponent from "./loaderComponent";
import postsEditor from "./postsEditorComponent";

class FormsAbortLessonApp {
    initApplication() {
        store.retrievePosts();

        loaderComponent.initLoader();

        postsEditor.initComponent();

        store.logPosts.subscribe(
            (value) => {
                console.log('suns: ', value);

                console.log('store: ', store.posts);
            }
        )
    }
}

const formsAbortLessonApp = new FormsAbortLessonApp();

export default formsAbortLessonApp;