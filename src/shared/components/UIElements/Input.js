import React, { useReducer } from "react";

import "./Input.css";

const Input = (props) => {
  const [state, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const element =
    props.element === "input" ? (
      <input id={props.id} type={props.type} placeholder={props.placeholder} />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        placeholder={props.placeholder}
      />
    );

  return (
    <div className={`input-container`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
    </div>
  );
};

export default Input;
