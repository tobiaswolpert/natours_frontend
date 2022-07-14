import logo from "../../images/logo-white.png";
import { Outlet, Link, Navigate } from "react-router-dom";
import { Fragment } from "react";
import Footer from "../../components/footer/footer.component";
import { useSelector } from "react-redux";
import {
  selectUserIsLoggedIn,
  selectUserDetails,
} from "../../store/user/user.selector";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/user/user.action";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const userData = useSelector(selectUserDetails);
  const url = `${process.env.REACT_APP_BACKEND_URL}/img`;
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="header">
        <Link className="header__text" to="/">
          All tours
        </Link>
        <img className="header__logo" alt="header__logo" src={logo} />
        <div className="header__authentication">
          {isLoggedIn ? (
            <>
              <Link
                className="header__authentication-login"
                to="/"
                onClick={() => {
                  dispatch(logoutUser());
                  navigate("/");
                }}
              >
                Log Out
              </Link>
              <Link className="user" to="/me">
                <img
                  src={url + "/users/" + userData.photo}
                  alt="user_image"
                  crossOrigin="anonymous"
                  className="user__image"
                />
                <div className="user__name">{userData.name.split(" ")[0]}</div>
              </Link>
            </>
          ) : (
            <>
              <Link className="header__authentication-login" to="/login">
                Log in
              </Link>
              <Link className="header__authentication-signup" to="signup">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default Header;
