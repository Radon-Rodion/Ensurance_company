/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import "./styles/main.css";
import "./styles/main.scss";
import React, { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./pages/home";
import PageWithTable from "./pages/pageWithTable";
import store from "@/redux/store/store";

interface AppProps {
  nothing: boolean;
}

interface AppState {
  hasError: boolean;
}

class App extends Component<AppProps, AppState> {
  ["constructor"]: typeof App;

  render() {
    return (
      <StrictMode>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageWithTable />} />
          </Routes>
        </Router>
      </StrictMode>
    );
  }
}

ReactDom.render(
  <Provider store={store}>
    <App nothing={false} />
  </Provider>,
  document.getElementById("app")
);
