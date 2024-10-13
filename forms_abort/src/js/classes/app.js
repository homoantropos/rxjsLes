import store from "../services/store";
import loaderSpinner from "./loaderComponent";
import postsEditor from "./postsEditorComponent";
import {delay} from "rxjs";

class FormsAbortLessonApp {
    async initApplication() {
        loaderSpinner.initLoader();

        loaderSpinner.toggleLoader(true);

        await new Promise((resolve, reject) => {
            try {
                store.retrievePosts();

                postsEditor.initComponent();

                store.logPosts.pipe(delay(1000)).subscribe(
                    (value) => {
                        console.log('suns: ', value);

                        console.log('store: ', store.posts);

                        loaderSpinner.toggleLoader(false);
                    }
                );

                setTimeout(() => resolve(), 5000);
            } catch(e) {
                console.error(e);

                reject();
            }

        });

        loaderSpinner.toggleLoader(false);

    }
}

const formsAbortLessonApp = new FormsAbortLessonApp();

export default formsAbortLessonApp;