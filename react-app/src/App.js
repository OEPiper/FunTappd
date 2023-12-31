import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import VenuesIndex from "./components/VenuesIndex";
import VenueShow from "./components/VenueShow";
import NewVenue from "./components/CreateVenue";
import BeerShow from "./components/BeerShow";
import Footer from "./components/Footer";

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
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <LandingPage/>
          </Route>
          <Route exact path='/home'>
            <VenuesIndex/>
          </Route>
          <Route exact path='/venues/:venueId'>
            <VenueShow/>
          </Route>
          <Route exact path='/beers/:beerId'>
            <BeerShow/>
          </Route>
        </Switch>
      )}
      <Footer/>
    </>
  );
}

export default App;
