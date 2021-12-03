import React, { useContext, useState } from 'react';

import './PlaceCard.css';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/UIElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import GoogleMaps from '../../shared/components/UIElements/GoogleMaps';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

const PlaceCard = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
  const confirmDeleteHandler = async () => {
    setShowDeleteWarning(false);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/places/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

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
            <Button
              className='place-card__button'
              onClick={cancelDeleteHandler}
            >
              Cancel
            </Button>
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
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='place-card__img-wrapper'>
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className='place-card__text-wrapper'>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className='place-card__btn-wrapper'>
            <Button onClick={openMapHandler}>view map</Button>
            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>edit</Button>
            )}
            {auth.userId === props.creatorId && (
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
