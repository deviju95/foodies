import React from "react";

import "./Form.css";

import Button from "../../shared/components/UIElements/Button";
import Input from "../../shared/components/UIElements/Input";

const NewPlace = () => {
  return (
    <form className='form'>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        placeholder='Write your title here....'
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        placeholder='Describe your place here...'
      />
      <Input
        id='address'
        element='input'
        label='Address'
        placeholder='Write the address here...'
      />
      <div className='form-btn-wrapper'>
        <Button inverse type='submit'>
          Add Place
        </Button>
      </div>
    </form>
  );
};

export default NewPlace;
