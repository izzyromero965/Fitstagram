import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import './Navbar.css';

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  return (
    <nav className="navbar-container">
      <NavLink to="/home" exact={true} ClassName="active">
        Fitstagram
      </NavLink>
      <div>
        <NavLink to="/home" exact={true}>
          <i class="fa-solid fa-house"></i>
        </NavLink>
        <i class="fa-solid fa-plus"></i>
        <img src={user.profile_image_url} className="profile-img"></img>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default NavBar;
