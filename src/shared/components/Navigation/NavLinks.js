import React from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";

const NavLinks = () => {
  return (
    <ul className='nav__links'>
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
  );
};

export default NavLinks;
