import store from "../store/store";
import loaderSpinner from "./loaderComponent";
import postsEditor from "./postsEditorComponent";
import {getDefaultObserver} from "../utils/getDefaultObserver";
import searchComponent from "./searchComponent";

class FormsAbortLessonApp {
    async initApplication() {
        loaderSpinner.initLoader();

        loaderSpinner.toggleLoader(true);

        await new Promise((resolve, reject) => {
            try {
                store.retrievePosts();

                postsEditor.initComponent();

                searchComponent.initSearchComponent();

                const logsSubs = store.logPosts.subscribe(
                    getDefaultObserver(logsSubs, '', this.successRequestHandler.bind(this))
                );

                resolve();
            } catch (e) {
                console.error(e);

                reject();
            }

        });

        loaderSpinner.toggleLoader(false);

    }

    successRequestHandler(value) {
        console.log('value from subs: ', value);

        console.log('value from store: ', store.store.getState().posts);

        loaderSpinner.toggleLoader(false);
    }
}

const formsAbortLessonApp = new FormsAbortLessonApp();

export default formsAbortLessonApp;