import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

import MainNavigation from './shared/components/Navigation/MainNavigation';
// lazy() :: loads page when user opens it. Optimize browser load time.
const Users = React.lazy(() => import('./contents/pages/Users'));
const NewPlace = React.lazy(() => import('./contents/pages/NewPlace'));
const UserPlaces = React.lazy(() => import('./contents/pages/UserPlaces'));
const UpdatePlace = React.lazy(() => import('./contents/pages/UpdatePlace'));
const Auth = React.lazy(() => import('./contents/pages/Auth'));

const App = () => {
  const { userId, token, login, logout } = useAuth();

  let routes;

  if (token) {
    routes = (
      // If I signup/login, then, "/auth" route does not exist in this group of routes,
      // so I am redirected to "/" route.
      <Switch>
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
          <UpdatePlace />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        token: token,
        userId: userId,
        isLoggedIn: !!token,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main className='content'>
          <Suspense
            fallback={
              <div className='center-item'>
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
