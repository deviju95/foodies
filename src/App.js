import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";

import Users from "./contents/pages/Users";
import UserPlaces from "./contents/pages/UserPlaces";
import NewPlace from "./contents/pages/NewPlace";
import EditPlace from "./contents/pages/EditPlace";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <MainNavigation />
        <Switch>
          <main className='content'>
            <Route path='/' exact>
              <Users />
            </Route>
            <Route path='/:userId/places' exact>
              <UserPlaces />
            </Route>
            <Route path='/places/new' exact>
              <NewPlace />
            </Route>
            <Route path='/places/:placeId'>
              <EditPlace />
            </Route>
            <Redirect to='/' />
          </main>
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
