import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { bindActionCreators } from "redux";

import App from "./App";
import store from "./store/setupStore";
import { getExistingJourney } from "./actions/journey";

import GlobalStyle from "./GlobalStyle";

import "./index.scss";

ReactDOM.render(
  <>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </>,
  document.getElementById("root")
);

if (window.location.pathname.length > 1) {
  const { dispatch } = store;
  const { getExistingJourney: boundGetExistingJourney } = bindActionCreators(
    { getExistingJourney },
    dispatch
  );

  const itinerary = window.location.pathname.substring(1);

  boundGetExistingJourney(itinerary);
}
