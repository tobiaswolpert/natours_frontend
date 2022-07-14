import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUserAsync } from "../../store/user/user.action";
import Spinner from "../../components/spinner/spinner.component";
import { useSelector } from "react-redux";
import {
  selectUserIsLoading,
  selectUserIsLoggedIn,
  selectUserStatus,
} from "../../store/user/user.selector";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Modal from "../../components/modal/modal.component";

const defaultLoginFields = {
  email: "",
  password: "",
};

const Login = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch();
  const [loginFields, setLoginFields] = useState(defaultLoginFields);
  const { email, password } = loginFields;
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const status = useSelector(selectUserStatus);
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => navigate(from, { replace: true }), 2000);
    }
  }, [isLoggedIn]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(loginUserAsync({ email, password }));
    setLoginFields(defaultLoginFields);
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "email":
        setLoginFields({
          ...loginFields,
          [event.target.name]: event.target.value,
        });
        break;
      case "password":
        setLoginFields({
          ...loginFields,
          [event.target.name]: event.target.value,
        });
        break;
      default:
        console.log("Check");
    }
  };

  return (
    <>
      <Modal loggedIn={isLoggedIn} status={status} />
      <div className="login">
        <h3>Log into your account</h3>
        <form className="login__form" onSubmit={handleSubmit}>
          <label>Email address</label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            onChange={handleChange}
            value={email}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            pattern=".{8,}"
            placeholder="********"
            onChange={handleChange}
            value={password}
          />
          <button className="login__btn" type="submit">
            LOGIN
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
