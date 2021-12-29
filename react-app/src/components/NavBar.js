import React, { useState } from 'react';
import { Modal } from './context/Modal';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/session';
import Search from './Search';
import './Navbar.css';
import CreatePostForm from './CreatePost';

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };
  const user = useSelector((state) => state.session.user);
  return (
    <nav className="navbar-container">
      <a href="/home" className="logo">
        Fitstagram
      </a>
      <Search />
      <div className="menu">
        <a href="/home">
          <i className="fa-solid fa-house icon"></i>
        </a>
        <i
          className="fas fa-arrow-circle-up icon"
          onClick={() => {
            setShowModal(true);
          }}
        ></i>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <CreatePostForm setShowModal={setShowModal} />
          </Modal>
        )}
        <NavLink to={`/users/${sessionUser?.id}`} exact={true}>
          <img src={user?.profile_image_url} className="profile-img"></img>
        </NavLink>
        <button className="logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
