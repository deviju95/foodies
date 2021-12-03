import React, { useContext, useState } from 'react';

import './Auth.css';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/UIElements/Input';
import Button from '../../shared/components/UIElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/UIElements/ImageUpload';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    // after login or signup, page redirected to...

    if (isLoginMode) {
      // for logging in -----------
      try {
        // created HttpRequest Hook to be used whenever fetching data from database.
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/users/login',
          'POST',
          // Data that we will send to backend.
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          // Don't forget to attach headers, so express.json() can kick-in correctly upon incoming req.
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
    // for signing up -----------
    else {
      try {
        // FormData can also send binary data such as image, not only JSON. fetch() can only send json.
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);

        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/users/signup',
          'POST',
          // JSON.stringify({
          //   name: formState.inputs.name.value,
          //   email: formState.inputs.email.value,
          //   password: formState.inputs.password.value,
          // }),
          formData
          // {
          //   'Content-Type': 'application/json',
          // }
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className='auth-form-container'>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element='input'
              id='name'
              type='text'
              label='Your Name'
              placeholder='Write your name here...'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a name.'
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              center
              id='image'
              onInput={inputHandler}
              errorText='Please provide an image.'
            />
          )}
          <Input
            element='input'
            id='email'
            type='email'
            label='E-mail'
            placeholder='Enter your e-mail here...'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Please enter a valid email.'
            onInput={inputHandler}
          />
          <Input
            element='input'
            id='password'
            type='password'
            label='Password'
            placeholder='Enter password here...'
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText='Please enter a valid password, at least 5 characters.'
            onInput={inputHandler}
          />
          <Button
            className='auth-btn'
            inverse
            type='submit'
            disabled={!formState.formIsValid}
          >
            {isLoginMode ? 'Login' : 'Sign up'}
          </Button>
        </form>
        <Button onClick={switchModeHandler}>
          {isLoginMode ? 'Sign up' : 'Login'}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
