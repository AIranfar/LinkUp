import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import SplashPage from "./components/SplashPage"
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Feed from "./components/FeedPage";
import UserProfile from "./components/UserProfile"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/user/:userId">
            <UserProfile />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/Feed">
            <Feed />
          </Route>
          <Route exact path="/">
            <SplashPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
