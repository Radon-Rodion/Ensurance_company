import React, { Component, StrictMode } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import PageWithTable from "./pages/pageWithTable";

class App extends Component {  
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    render() {
      return (
        <StrictMode>
          <Router>
            <Switch>
              <Route exact path="/" render={(props) => <Home />} />
              <Route exact path="*" render={(props) => <PageWithTable />} />
            </Switch>
          </Router>
        </StrictMode>
      );
    }
  }

  export default App;