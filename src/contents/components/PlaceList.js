import React from "react";

import "./PlaceList.css";

import Card from "../../shared/components/UIElements/Card";
import PlaceCard from "./PlaceCard";
import Button from "../../shared/components/UIElements/Button";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='center-item'>
        <Card>
          <h2 className='create-place-text'>
            No foodies yet! Maybe create one?
          </h2>
          <Button inverse to='/places/new'>
            New Place
          </Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className='place-list'>
      {props.items.map((place) => (
        <PlaceCard
          creatorId={place.creator}
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
