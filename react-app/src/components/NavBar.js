import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/session';
import Search from './Search';
import './Navbar.css';

const NavBar = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };
  const user = useSelector((state) => state.session.user);
  return (
    <nav className="navbar-container">
      <NavLink to="/home" exact={true} className="logo">
        Fitstagram
      </NavLink>
      <Search />
      <div className="menu">
        <NavLink to="/home" exact={true}>
          <i className="fa-solid fa-house icon"></i>
        </NavLink>
        <i class="fas fa-arrow-circle-up icon"></i>
        <img src={user?.profile_image_url} className="profile-img"></img>
        <button className="logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
