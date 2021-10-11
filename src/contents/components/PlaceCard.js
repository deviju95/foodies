import React, { useState } from "react";

import "./PlaceCard.css";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/UIElements/Button";

const PlaceCard = (props) => {
  const [openMap, setOpenMap] = useState(false);
  const openMapHandler = () => setOpenMap(true);
  const closeMapHandler = () => setOpenMap(false);

  return (
    <React.Fragment>
      <modal show={openMap} onCancel={closeMapHandler}>
        <di className='map-container'>
          <map />
        </di>
      </modal>
      <modal>
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undon thereafter.
        </p>
      </modal>
      <li className='place-card__container'>
        <Card className='place-card__card'>
          <div className='place-card__img-wrapper'>
            <img src={props.image} alt={props.title} />
          </div>
          <div className='place-card__text-wrapper'>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className='place-card__btn-wrapper'>
            <Button onClick={openMapHandler}>view map</Button>
            <Button>edit</Button>
            <Button danger>delete</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceCard;
