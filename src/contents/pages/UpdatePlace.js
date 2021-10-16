import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "../../shared/hooks/form-hook";

import "./Form.css";

import Input from "../../shared/components/UIElements/Input";
import Button from "../../shared/components/UIElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Card from "../../shared/components/UIElements/Card";

const DUMMY_PLACES = [
  {
    creator: "u1",
    id: "p1",
    title: "Chim Studio",
    description: "Chim's 2021 studio at Gangdong-Gu",
    imageUrl: require("../../assets/chim1.png").default,
    address: "Gangdong-gu, Seoul, South Korea",
    location: {
      lat: 37.5492942,
      lng: 127.111408,
    },
  },
  {
    creator: "u1",
    id: "p2",
    title: "bbyoe chicken",
    description: "뼈치킨이라는 개념을 사는거죠",
    imageUrl: require("../../assets/chim2.jpg").default,
    address: "Gangdong-gu, Seoul, South Korea",
    location: {
      lat: 37.5492942,
      lng: 127.111408,
    },
  },
  {
    creator: "u1",
    id: "",
    title: "K-Town Ttoekbokki",
    description: "낭만이 있는 떡볶이",
    imageUrl:
      "https://mblogthumb-phinf.pstatic.net/20141223_171/ribbonliz_1419289497073AXY3i_JPEG/20141203_181205.jpg?type=w2",

    address:
      "H Mart City Center, 3500 W 6th St Suite 100, Los Angeles, CA 90020",
    location: {
      lat: 34.047449,
      lng: -118.2999788,
    },
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find((x) => x.id === placeId);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
          address: {
            value: identifiedPlace.address,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className='center-item'>
        <Card>
          <h2>Could not find place.</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='center-item'>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className='form' onSubmit={placeUpdateSubmitHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        placeholder='Write your title here....'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title.'
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialIsValid={formState.inputs.title.isValid}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        placeholder='Describe your place here...'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description (at least 5 characters).'
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialIsValid={formState.inputs.description.isValid}
      />
      <Input
        id='address'
        element='input'
        label='Address'
        placeholder='Write the address here...'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid address.'
        onInput={inputHandler}
        initialValue={formState.inputs.address.value}
        initialIsValid={formState.inputs.address.isValid}
      />
      <div className='form-btn-wrapper'>
        <Button inverse type='submit' disabled={!formState.formIsValid}>
          Update Place
        </Button>
      </div>
    </form>
  );
};

export default UpdatePlace;
