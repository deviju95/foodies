import React, { useRef, useState, useEffect } from 'react';

import './ImageUpload.css';

import Button from './Button';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  //   this is equal to "clicking" the input connected through useRef
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const touchHandler = () => {
    setIsTouched(true);
  };

  return (
    <React.Fragment>
      <div className='image_upload__container'>
        <input
          id={props.id}
          style={{ display: 'none' }}
          ref={filePickerRef}
          type='file'
          accept='.jpg,.png,.jpeg'
          onChange={pickedHandler}
        />
        <div>
          <div className={`${props.previewSize} image_upload__preview `}>
            {previewUrl && <img src={previewUrl} alt='Preview' />}
            {!previewUrl && (
              <p className='preview_placeholder'>{props.placeholder}</p>
            )}
          </div>
          <div className='button_center'>
            <Button
              type='button'
              onBlur={touchHandler}
              onClick={pickImageHandler}
            >
              Pick Image
            </Button>
          </div>
        </div>
        {!isValid && isTouched && (
          <p className='image_upload__invalid'>{props.errorText}</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default ImageUpload;
