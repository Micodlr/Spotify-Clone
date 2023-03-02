import React, { useState, useEffect, Routes, useRef } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import SignInSide from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import LandingPage from "./components/LandingPage";
import Content from "./components/dashboard/Content";
import Header from "./components/dashboard/Header";
import Navigator from "./components/dashboard/Navigator";
import Paperbase from "./components/dashboard/Paperbase";
import HomePage from "./components/dashboard/Home";
import AudioPlayer from "material-ui-audio-player";
import AudioContext from "./components/dashboard/AudioContext";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const audioRef = useRef(null);

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
      {/* <Navigator /> */}
      {/* <Header /> */}
      {/* <Content /> */}
      <Switch>
        <Route path="/">
          <AudioContext.Provider value={audioRef}>
            <Paperbase />
          </AudioContext.Provider>

          {/* <Route path="home">
              <Content Component={HomePage} />
            </Route>
            <Route path="search">
              <Content Component={UsersList} />
            </Route>
            <Route path="/library">
              <Content Component={User} />
            </Route>
          </Paperbase> */}
        </Route>

        <Route path="/login" exact={true}>
          <SignInSide />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUp />
        </Route>
        {/* <Route path="/dashboard" exact={true}>
          <Content />
        </Route> */}
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <User />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
