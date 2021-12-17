import React from 'react';
import LoginForm from '../auth/LoginForm';
import { login } from '../../store/session';
import { useDispatch } from 'react-redux';
import './splash.css';
import { useHistory } from 'react-router-dom';

const SplashPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const demoLogin = async () => {
    const email = 'demo@aa.io';
    const password = 'password';
    await dispatch(login(email, password));
    history.push('/home');
  };
  return (
    <div className="splash-wrapper">
      <div className="content-container">
        <div className="header-img-container"></div>
      </div>
      <div className="description-container">
        <div className="top-description">
          <h1>Fitstagram</h1>
          <LoginForm />
          <div className="or">
            <div className="dash"></div>
            <div>OR</div>
            <div className="dash"></div>
          </div>
          <div>
            <button className="demoBtn" onClick={demoLogin}>
              Log in as Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
