import React from 'react';

import './PlaceList.css';

import Card from '../../shared/components/UIElements/Card';
import PlaceCard from './PlaceCard';
import Button from '../../shared/components/UIElements/Button';

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='center-item'>
        <Card className='create_place_card'>
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
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
