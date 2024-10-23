import { configureStore } from "@reduxjs/toolkit";

class ReduxStoreService {
  store;

  initialState = { count: 0 };

  constructor() {
    this.createStore();
  }

  showStore() {
    this.store.subscribe(() => console.log(this.store.getState()));

    this.store.dispatch({ type: "INCREMENT" });
    this.store.dispatch({ type: "INCREMENT" });
    this.store.dispatch({ type: "DECREMENT" });
  }

  countReducer = (state = this.initialState, action) => {
    switch (action.type) {
      case "INCREMENT":
        return { count: state.count + 1 };
      case "DECREMENT":
        return { count: state.count - 1 };
      default:
        return state;
    }
  };

  createStore() {
    this.store = configureStore({ reducer: this.countReducer });
  }
}

const reduxStoreService = new ReduxStoreService();

export default reduxStoreService;
