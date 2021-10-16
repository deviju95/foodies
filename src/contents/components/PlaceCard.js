import React, { useContext, useState } from "react";

import "./PlaceCard.css";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/UIElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import GoogleMaps from "../../shared/components/UIElements/GoogleMaps";
import { AuthContext } from "../../shared/context/auth-context";

const PlaceCard = (props) => {
  const auth = useContext(AuthContext);

  const [openMap, setOpenMap] = useState(false);
  const openMapHandler = () => setOpenMap(true);
  const closeMapHandler = () => setOpenMap(false);

  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const showDeleteWarningHandler = () => {
    setShowDeleteWarning(true);
  };
  const cancelDeleteHandler = () => {
    setShowDeleteWarning(false);
  };
  const confirmDeleteHandler = () => {
    setShowDeleteWarning(false);
    console.log("Deleting...");
  };

  return (
    <React.Fragment>
      <Modal
        show={openMap}
        onCancel={closeMapHandler}
        header={props.address}
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className='map-container'>
          <GoogleMaps center={props.coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showDeleteWarning}
        onCancel={cancelDeleteHandler}
        header='Are you sure?'
        footer={
          <React.Fragment>
            <Button onClick={cancelDeleteHandler}>Cancel</Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p className='delete-warning'>
          Do you want to proceed and delete this place? Please note that it
          can't be undon thereafter.
        </p>
      </Modal>

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
            {auth.isLoggedIn && (
              <Button to={`/places/${props.id}`}>edit</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>
                delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceCard;
