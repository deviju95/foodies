import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //   useRef keeps data inside array, like saving records
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      // while "isLoading" is true, "LoadingSpinner.js" will run.
      setIsLoading(true);

      // AbortController is a built-in function in modern browsers.
      // This allows to abort process if browser changes while fetch process is incomplete.
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
      try {
        // sidenote:: fetch in default process a GET request, so no need to declare method if only used for get method.
        const response = await fetch(url, {
          method: method,
          body: body,
          headers: headers,
          //  below is: connecting abort function and this whole fetched data/process
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        // if request is successfully completed, have to remove abortctrl in action.
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        // show error if response code is not 200s. (400, 500) because they are not error codes by default.
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  // when useEffect return a function, it executes as a clean-up function when component unmounts.
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
    clearError,
  };
};
