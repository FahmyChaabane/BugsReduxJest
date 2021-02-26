import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { ADD_USER } from "./reducers/users";
import "./index.css";

const store = configureStore();

console.log(store.getState());
store.dispatch(ADD_USER({ id: 99, name: "a" }));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
