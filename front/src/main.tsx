import "./styles/main.css";
import "./styles/main.scss";
import React, { Component, ErrorInfo, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

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

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error);
    console.error(info.componentStack);
    AppContainer.getDerivedStateFromError();
  }

  rerender() {
    this.forceUpdate();
    return <div>Hello</div>;
  }

  errorRouting() {
    return (
      <Routes>
        <Route path="/" element={this.rerender()} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  normalRouting() {
    return (
      <Routes>
        <Route path="/" element={<div>Hello</div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  checkErrors() {
    if (this.state.hasError && window.location.pathname !== "/") {
      this.state = {
        hasError: false,
      };
      return this.errorRouting();
    }
    return this.normalRouting();
  }

  render() {
    return (
      <StrictMode>
        <Router>{this.checkErrors()}</Router>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
