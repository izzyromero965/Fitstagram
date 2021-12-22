import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import './Navbar.css';
import Search from './Search';

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  return (
    <nav className="navbar-container">
      <NavLink to="/home" exact={true} className="active">
        Fitstagram
      </NavLink>
      <Search />
      <div>
        <NavLink to="/home" exact={true}>
          <i className="fa-solid fa-house"></i>
        </NavLink>
        <i className="fa-solid fa-plus"></i>
        <img src={user.profile_image_url} className="profile-img"></img>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default NavBar;
