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
        <div className="header-img-container">
          <img
            src="https://media2.giphy.com/media/3mJyfDFH0BqgbdghWJ/giphy.gif?cid=ecf05e47qus6lrrmkenpd40h41s9okdgo7w0xq03i9dyhiue&rid=giphy.gif&ct=g"
            className="workout-gif"
          ></img>
        </div>
      </div>
      <div className="description-container">
        <div className="top-description">
          <div className="title">
            <h1 className="description-title">Fitstagram</h1>
            <span>Find inspiration for your next workout!</span>
          </div>
          <LoginForm />
          <div className="or">
            <div className="dash"></div>
            <span className="orSpan"> OR </span>
            <div className="dash"></div>
          </div>
          <div>
            <button className="demoBtn" onClick={demoLogin}>
              Log in as Demo
            </button>
          </div>
        </div>
        <div className="signup-div">
          <span>
            Don't have an account? <a href="/sign-up">Sign up</a>
          </span>
        </div>
        <div className="splash-footer">
          <span>Developed by Israel Romero</span>
          <div className="splash-icons">
            <a href="https://github.com/snakedreamz">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/israel-romero-917a54219/">
              <i class="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
