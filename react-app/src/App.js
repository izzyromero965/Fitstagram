import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';

import { authenticate } from './store/session';
import ProfilePage from './components/ProfilePage';
import SplashPage from './components/Splashpage';
import Homepage from './components/Homepage';
import Discover from './components/Discover';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <SplashPage />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <NavBar />
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <NavBar />
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/home" exact={true}>
          <NavBar />
          <Homepage />
        </ProtectedRoute>
        <ProtectedRoute path="/discover" exact={true}>
          <NavBar />
          <Discover />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
