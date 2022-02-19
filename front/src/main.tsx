/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import "./styles/main.css";
import "./styles/main.scss";
import React, { Component, ErrorInfo, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home";
import PageWithTable from "./pages/pageWithTable";

interface AppProps {
  nothing: boolean;
}

interface AppState {
  hasError: boolean;
}

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);
    this.state = { hasError: false };
  }

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

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
