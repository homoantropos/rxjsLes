import './forms_abort.scss';
import '../assets/logo-javascript.png';
import postsEditor from "./js/classes/postsEditorComponent";
import store from "./js/services/store";

store.retrievePosts();

const formOperator = postsEditor;

formOperator.initComponent();