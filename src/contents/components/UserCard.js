import React from "react";
import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Avatar from "../../shared/components/UIElements/Avatar";

import "./UserCard.css";

const UserCard = (props) => {
  return (
    <li className='user-card__container'>
      <Card className='user-card__card'>
        <Link to={`/${props.id}/places`}>
          <div className='user-card__img-wrapper'>
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className='user-card__text-wrapper'>
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserCard;
