import React, { useEffect, useState } from "react";
import "./styleSheets/App.css";
import { Switch, Route, Redirect, useHistory } from "react-router";
import HomePage from "./pages/HomePage";

import PlacesToStayPage from "./pages/PlacesToStay";
import StaysInAreaPage from "./pages/StaysInAreaPage";

import OneApartmentHost from "./pages/OneApartmentHost";

import HostDashBoardPage from "./pages/HostDashBoardPage";

import LoginPage, { UserCredentials } from "./pages/LoginPage";
import HostingPage from "./pages/HostingPage";
import Footer from "./components/Footer";
import HostAddOne from "./pages/HostAddOne";

export type Props = {
  className?: string;
  userLoggedIn: boolean;
  userId: number | null;
  setUserId: () => void;
  setUserLoggedId: () => void;
};

export type Apartment = {
  id: number;
  priceNight: number;
  bedrooms: number;
  maxPeopleIn: number;
  description: string;
  city: string;
  postCode: string;
  road: string;
  imageUrl1: string;
  imageUrl2: string;
  imageUrl3: string;
  userOwnerId: number;
  userRentingId: null;
  location: [
    {
      id: number;
      latitude: number;
      longitude: number;
      apartmentId: number;
    }
  ];
};

type UserLoggedIn = {
  userLoggedIn: Props["userLoggedIn"];
  setUserLoggedId: Props["setUserLoggedId"];
};

type UserId = {
  userId: Props["userId"];
  setUserId: Props["setUserId"];
};

function App({ className }: Props) {
  const [userLoggedIn, setUserLoggedIn] = useState<UserLoggedIn>(false);

  const [userId, setUserId] = useState<UserId | null>();

  return (
    <div className="App ">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <HomePage
            className={className}
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            userId={userId}
          />
        </Route>
        <Route path="/placestostay">
          <PlacesToStayPage
            className={className}
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            userId={userId}
          />
        </Route>
        <Route path="/hosting">
          <HostingPage className={className} />
        </Route>
        <Route path="/addhostproperty"></Route>
        {/* <Route path="/:acc"></Route>  This is causing a bug*/}
        <Route path="/login-host">
          <LoginPage
            className={className}
            setUserLoggedIn={setUserLoggedIn}
            setUserId={setUserId}
          />
        </Route>
        <Route path="/staysin/:search">
          <StaysInAreaPage
            className={className}
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            userIdProp={userId}
          />
        </Route>

        <Route path="/apartment/:id/:apartmentId/:postCode">
          <OneApartmentHost
            className={className}
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            userId={userId}
          />
        </Route>

        <Route path="/dashboard/:id">
          <HostDashBoardPage
            className={className}
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            userId={userId}
          />
        </Route>

        <Route path="/addhostproperty">
          <HostAddOne />
        </Route>
        {/* <Route path="/:accomidationname">
          <h1>Hello world</h1>
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
