import React from "react";

import "./PlaceList.css";

import Card from "../../shared/components/UIElements/Card";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div>
        <Card>
          <h2>No foodies yet! Maybe create one?</h2>
        </Card>
      </div>
    );
  }
  return <div></div>;
};

export default PlaceList;
