import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

import Button from "../UIElements/Button";

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
        <Button inverse>Logout</Button>
      </li>
    </ul>
  );
};

export default NavLinks;
