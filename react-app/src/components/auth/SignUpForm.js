import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './Signup.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile_image_url, set_profile_image_url] = useState();
  const [nickname, setNickname] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const formData = new FormData();
      formData.append('profile_image_url', profile_image_url);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('nick_name', nickname);
      console.log('XXXXXXXXXXXXXXXXX', formData.get('profile_image_url'));
      const data = await dispatch(signUp(formData));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="signup-container">
      <form onSubmit={onSignUp} className="signup-form">
        <div>
          {errors?.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <span className="logo">Fitstagram</span>
        <div className="form-input-div">
          <div className="label-container">
            <label>Username:</label>
          </div>
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
            required
          ></input>
        </div>
        <div className="form-input-div">
          <div className="label-container">
            <label>Email:</label>
          </div>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            required
          ></input>
        </div>
        <div className="form-input-div">
          <div className="label-container">
            <label>Password:</label>
          </div>
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
            required
          ></input>
        </div>
        <div className="form-input-div">
          <div className="label-container">
            <label>Repeat Password:</label>
          </div>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className="form-input-div">
          <div className="label-container">
            <label>Profile Image:</label>
          </div>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            onChange={(e) => set_profile_image_url(e.target.files[0])}
            required
          />
        </div>
        <div className="form-input-div">
          <div className="label-container">
            <label>Nickname:</label>
          </div>
          <input
            type="text"
            name="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <div className="login-container">
        <span>
          Already have an account? <a href="/">Log in</a>
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
  );
};

export default SignUpForm;
