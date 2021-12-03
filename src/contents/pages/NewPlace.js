import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import './Form.css';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import Input from '../../shared/components/UIElements/Input';
import Button from '../../shared/components/UIElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/UIElements/ImageUpload';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
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

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('creator', auth.userId);
      formData.append('image', formState.inputs.image.value);

      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/places',
        'POST',
        formData,
        { Authorization: 'Bearer ' + auth.token }
      );
      // Redirect the user to a different page
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className='form' onSubmit={placeSubmitHandler}>
        <Input
          id='title'
          element='input'
          type='text'
          label='Title'
          placeholder='Write your title here....'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid title.'
          onInput={inputHandler}
        />
        <Input
          id='description'
          element='textarea'
          label='Description'
          placeholder='Describe your place here...'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid description (at least 5 characters).'
          onInput={inputHandler}
        />
        <Input
          id='address'
          element='input'
          label='Address'
          placeholder='Write the address here...'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid address.'
          onInput={inputHandler}
        />
        <ImageUpload
          id='image'
          onInput={inputHandler}
          errorText='Please provide an image.'
        />
        <div className='form-btn-wrapper'>
          <Button inverse type='submit' disabled={!formState.formIsValid}>
            Add Place
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
