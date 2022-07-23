import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Header from "./routes/header/header.component";
import ProtectedRoutes from "./routes/protected/protected.component";
import Spinner from "./components/spinner/spinner.component";
import Error from "./components/error/error.component";
// import Login from "./routes/login/login.component";
// import Profile from "./routes/profile/profile.component";
// import MyTours from "./routes/myTours/myTours.component";
// import TourContainer from "./routes/tour/tourContainer.component";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchToursAsync } from "./store/tours/tours.action";
import {
  selectUserIsLoggedIn,
  selectUserToken,
  selectTokenExpiration,
} from "./store/user/user.selector";
import { logoutUser } from "./store/user/user.action";
import { selectError } from "./store/tours/tours.selector";

//User React.lazy() to lazy load certain routes
const Login = React.lazy(() => import("./routes/login/login.component"));
const Profile = React.lazy(() => import("./routes/profile/profile.component"));
const MyTours = React.lazy(() => import("./routes/myTours/myTours.component"));
const TourContainer = React.lazy(() =>
  import("./routes/tour/tourContainer.component")
);

let logoutTimer;

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const token = useSelector(selectUserToken);
  const tokenExpiration = useSelector(selectTokenExpiration);
  const tourError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchToursAsync());
  }, [dispatch]);

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime =
        new Date(tokenExpiration).getTime() - new Date().getTime();
      logoutTimer = setTimeout(() => dispatch(logoutUser()), remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, dispatch, tokenExpiration]);

  return (
    <div className="app">
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={tourError ? <Error /> : <Home />} />
            <Route path="/tour/:tourName" element={<TourContainer />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/me" element={<Profile />} />
              <Route path="/my-tours" element={<MyTours />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
