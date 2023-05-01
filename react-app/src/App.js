import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import SplashPage from "./components/SplashPage";
import LeftNavBar from "./components/Navigation/LeftNavBar";
import HomePage from "./components/HomePage"
import SingleProjectPage from "./components/SingleProjectPage";
import CreateProjectPage from "./components/ProjectModals/CreateProjectPage";
import NotFound from "./components/NotFound";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);



  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/project/:projectId">
            <SingleProjectPage />
          </Route>
          <Route exact path="/project">
            <CreateProjectPage />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
