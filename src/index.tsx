import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { Provider, useSelector } from "react-redux";
import { rootReducer } from "./services/reducers/rootReducer";
import { compose, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { BrowserRouter, Router } from "react-router-dom";
import { socketMiddleware } from "./services/middleware/wsmiddleware";
import { socketMiddlewareAuth } from "./services/middleware-auth/wsmiddleware-auth";
import { getCookie } from "./services/Coockie/getCookie";

const accessToken = getCookie("accessToken")
console.log(getCookie("accessToken"))

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      socketMiddleware("wss://norma.nomoreparties.space/orders/all"),
      socketMiddlewareAuth("wss://norma.nomoreparties.space/orders?token="+`${getCookie("accessToken")?.replace('Bearer ','')}`)
    )
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
