import {domQueries} from "../config/domQueries";
import viewClassBinder from "../services/viewClassBinder";
import {debounceTime, fromEvent, map, take} from "rxjs";
import {getDefaultObserver} from "../utils/getDefaultObserver";
import store from "../store/store";

class SearchComponent {
    searchForm;

    searchQueryInput;

    search$;

    foundContent;

    constructor() {

    }

    initSearchComponent() {
        viewClassBinder.createClassPropsDueViewConfig().bind(this)(this._componentClassConfig);

        this.bindEventListeners();
    }

    bindEventListeners() {
        this.searchQueryInput && (this.search$ = fromEvent(this.searchQueryInput, 'input')
            .pipe(
                map((event) => {
                    const value = event?.target?.value;

                    if (typeof value === 'string') {
                        const currentId = event.target.value.trim().toLowerCase();

                        if (currentId.length <= 4) {
                            return currentId;
                        } else {
                            return currentId.substring(currentId.length - 4);
                        }
                    } else {
                        return 'wrong value'
                    }
                }),
                debounceTime(500),
            )
            .subscribe(getDefaultObserver(this.search$, '', this.searchPost.bind(this))));
    }

    searchPost(stringId) {
        const post = store.findPostById(stringId);

        if (post && this.foundContent) {
            this.foundContent.innerHTML = `
            <div>
            <span>${post.id}</span>
            <span>${post.author}</span>
            <span>${post.title}</span>
            <span>${post.body}</span>
</div>`;
        }
    }

    _componentClassConfig = [
        domQueries.searchForm,
        domQueries.searchQueryInput,
        domQueries.foundContent
    ]
}

const searchComponent = new SearchComponent();

export default searchComponent;