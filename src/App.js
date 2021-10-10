import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";

import UserPlaces from "./contents/pages/UserPlaces";
import UsersPage from "./contents/pages/UsersPage";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <MainNavigation />
        <Switch>
          <main className='content'>
            <Route to='/' exact>
              <UsersPage />
            </Route>
            <Route path='/:userId/places' exact>
              <UserPlaces />
            </Route>
            <Redirect to='/' />
          </main>
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
