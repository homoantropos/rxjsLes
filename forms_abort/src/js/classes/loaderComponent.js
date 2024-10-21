import { domQueries } from "../config/domQueries";
import viewClassBinder from "../services/viewClassBinder";

class LoaderComponent {
  loader;

  initLoader() {
    viewClassBinder.createClassPropsDueViewConfig().bind(this)(
      this._componentClassConfig,
    );
  }

  toggleLoader(condition) {
    if (typeof condition === "boolean") {
      condition ? this.showLoader() : this.hideLoader();
    } else {
      this.loader.display === "flex" ? this.hideLoader() : this.showLoader();
    }
  }

  showLoader() {
    this.loader && (this.loader.style.display = "flex");
  }

  hideLoader() {
    this.loader && (this.loader.style.display = "none");
  }

  _componentClassConfig = [domQueries.loader];
}

const loaderSpinner = new LoaderComponent();

export default loaderSpinner;
