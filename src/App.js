import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <MainNavigation />
        <main className='content'>
          <h1>Hello World!</h1>
        </main>
      </Router>
    </React.Fragment>
  );
};

export default App;
