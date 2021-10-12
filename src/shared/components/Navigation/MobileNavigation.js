import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./MobileNavigation.css";

const MobileNavigation = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      classNames='slide-in-left'
      timeout={200}
      mountOnEnter
      unmountOnExit
    >
      <div className='mobile-nav__container' onClick={props.onClick}>
        {props.children}
      </div>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("mobile-nav-hook")
  );
};

export default MobileNavigation;
