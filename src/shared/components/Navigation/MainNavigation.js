import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import "./MainNavigation.css";

import NavLinks from "./NavLinks";
import MobileNavigation from "./MobileNavigation";

const MainNavigation = () => {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
  const openMobileNav = () => {
    setMobileNavIsOpen(true);
  };
  const closeMobileNav = () => {
    setMobileNavIsOpen(false);
  };

  return (
    <React.Fragment>
      <MobileNavigation show={mobileNavIsOpen} onClick={closeMobileNav}>
        <NavLinks />
      </MobileNavigation>

      <header className='nav-container'>
        <div className='mobile-nav__menu-btn' onClick={openMobileNav}>
          <FaBars />
        </div>
        <h1 className='nav-title'>
          <Link to='/'>Foodies</Link>
        </h1>
        <nav className='main-nav__wrapper'>
          <NavLinks />
        </nav>
      </header>
    </React.Fragment>
  );
};

export default MainNavigation;
