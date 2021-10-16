import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

import Button from "../UIElements/Button";
import { AuthContext } from "../../context/auth-context";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className='nav__links'>
      <li>
        <NavLink to='/' exact>
          Home
        </NavLink>
      </li>

      {auth.isLoggedIn && (
        <li>
          <NavLink to='/u1/places'>My Page</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to='/places/new'>New Post</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to='/auth'>Login</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <Button inverse onClick={auth.logout}>
            Logout
          </Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
