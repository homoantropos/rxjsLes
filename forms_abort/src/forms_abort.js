import './forms_abort.scss';
import '../assets/logo-javascript.png';
import postsEditor from "./js/classes/postsEditorComponent";
import store from "./js/services/store";

store.retrievePosts();

const formOperator = postsEditor;

formOperator.initComponent();


setTimeout(
    () => console.log('store: ', store.posts), 3000
)

store.logPosts.subscribe(
    (value) => {
        console.log('suns: ', value);

        console.log('store: ', store.posts);
    }
)