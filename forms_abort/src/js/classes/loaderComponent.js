import {domQueries} from "../config/domQueries";
import viewClassBinder from "../services/viewClassBinder";

class LoaderComponent {
    loader;

    initLoader() {
        viewClassBinder.createClassPropsDueViewConfig().bind(this)(this._componentClassConfig);
    }


    _componentClassConfig = [
        domQueries.loader
    ]
}

const loader = new LoaderComponent();

export default loader;