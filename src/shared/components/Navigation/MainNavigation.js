import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./MainNavigation.css";

const MainNavigation = () => {
  return (
    <React.Fragment>
      <header className='nav-container'>
        <button>
          <span />
          <span />
          <span />
        </button>
        <h1 className='nav-title'>
          <Link to='/'>Foodies</Link>
        </h1>
        <nav>
          <ul>
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
