import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./MainNavigation.css";

import { FaBars } from "react-icons/fa";

const MainNavigation = () => {
  return (
    <React.Fragment>
      <header className='nav-container'>
        <div className='mobile-nav__menu-btn'>
          <FaBars />
        </div>
        <h1 className='nav-title'>
          <Link to='/'>Foodies</Link>
        </h1>
        <nav className='main-nav__wrapper'>
          <ul className='main-nav__links'>
            <li>
              <NavLink to='/' exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/u1/places'>My Page</NavLink>
            </li>
            <li>
              <NavLink to='/places/new'>New Post</NavLink>
            </li>
            <li>
              <NavLink to='/auth'>Login</NavLink>
            </li>
            <li>
              <button>Logout</button>
            </li>
          </ul>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default MainNavigation;
