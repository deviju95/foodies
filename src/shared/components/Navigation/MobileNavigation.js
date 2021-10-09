import React from "react";
import { CSSTransition } from "react-transition-group";

import "./MobileNavigation.css";

const MobileNavigation = (props) => {
  return (
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
};

export default MobileNavigation;
