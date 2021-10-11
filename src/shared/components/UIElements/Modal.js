import React from "react";
import { CSSTransition } from "react-transition-group";

import "./Modal.css";

import Backdrop from "./Backdrop";

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition in={props.show} timeout={200}></CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
