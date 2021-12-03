import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  // uid, token data comes from Auth.js - auth.login() arguments when user POST data.
  // When browser login user through localStorage (when page refreshes)
  // expirationDate will also be part of incoming data.
  const login = useCallback((uid, token, expirationDate) => {
    // token & uid data comes from those auth.login() arguments stored in Auth.js.
    setToken(token);
    setUserId(uid);
    // set timer to match with backend token expiration time:: (1 hour)
    const tokenExpirationTime =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationTime);
    // localStorage exist at browser developer mode, application tab.
    // JSON stringify allows to store object in string format.
    // so below is storing user login token on a local storage to be used for auto login when refresh page.
    localStorage.setItem(
      // userData comes from...
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        // toISOString() :: allows to convert date data to a string and string back to date.
        expiration: tokenExpirationTime.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  // auto-logout if token has expired
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  // JSON.parse changes stringified JSON to object.
  // below is to auto-login user when authenticated user refreshes page.
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId };
};
