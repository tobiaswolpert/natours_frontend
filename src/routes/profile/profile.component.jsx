import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  selectUserDetails,
  selectUserToken,
  selectUserIsLoading,
} from "../../store/user/user.selector";
import { updateSettingsAsync } from "../../store/user/user.action";

const Profile = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectUserToken);
  const isLoading = useSelector(selectUserIsLoading);

  const [userDetails, setUserDetails] = useState({
    name: useSelector(selectUserDetails).name,
    email: useSelector(selectUserDetails).email,
    passwordCurrent: "********",
    password: "********",
    passwordConfirm: "********",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    event.target.name.startsWith("password")
      ? dispatch(
          updateSettingsAsync(
            {
              passwordCurrent: userDetails.passwordCurrent,
              password: userDetails.password,
              passwordConfirm: userDetails.passwordConfirm,
            },
            token,
            "password"
          )
        )
      : dispatch(
          updateSettingsAsync(
            { name: userDetails.name, email: userDetails.email },
            token,
            "user"
          )
        );
    setUserDetails({
      ...userDetails,
      passwordCurrent: "********",
      password: "********",
      passwordConfirm: "********",
    });
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "email":
        setUserDetails({
          ...userDetails,
          [event.target.name]: event.target.value,
        });
        break;

      case "fullName":
        setUserDetails({
          ...userDetails,
          name: event.target.value,
        });
        break;

      case "passwordCurrent":
        setUserDetails({
          ...userDetails,
          [event.target.name]: event.target.value,
        });
        break;

      case "password":
        setUserDetails({
          ...userDetails,
          [event.target.name]: event.target.value,
        });
        break;

      case "passwordConfirm":
        setUserDetails({
          ...userDetails,
          [event.target.name]: event.target.value,
        });
        break;

      default:
        console.log("check");
    }
  };

  return (
    <div className="profile-container">
      <div className="user-nav">
        <ul className="user-nav__list">
          <li className="user-nav__item">
            <ion-icon name="settings-outline"></ion-icon>
            <span>settings</span>
          </li>
          <li className="user-nav__item">
            <ion-icon name="briefcase-outline"></ion-icon>
            <span>my bookings</span>
          </li>
          <li className="user-nav__item">
            <ion-icon name="star-outline"></ion-icon>
            <span>my reviews</span>
          </li>
          <li className="user-nav__item">
            <ion-icon name="card-outline"></ion-icon>
            <span>billing</span>
          </li>
        </ul>
      </div>

      <div className="main">
        <div className="settings">
          <h3>Your account settings</h3>

          <form className="input" onSubmit={handleSubmit} name="user">
            <label className="input__label">Name</label>
            <input
              className="input__input"
              name="fullName"
              value={userDetails.name}
              onChange={handleChange}
            ></input>

            <label className="input__label">Email</label>
            <input
              type="email"
              name="email"
              className="input__input"
              value={userDetails.email}
              onChange={handleChange}
            ></input>
            <button className="input__btn" type="submit">
              {isLoading ? "...updating" : "save settings"}
            </button>
          </form>
        </div>

        <hr></hr>

        <div className="settings">
          <h3>password change</h3>

          <form className="input" onSubmit={handleSubmit} name="password">
            <label className="input__label">Current password</label>
            <input
              type="password"
              name="passwordCurrent"
              className="input__input"
              pattern=".{8,}"
              required
              value={userDetails.passwordCurrent}
              onChange={handleChange}
            ></input>

            <label className="input__label">New password</label>
            <input
              type="password"
              name="password"
              className="input__input"
              pattern=".{8,}"
              required
              value={userDetails.password}
              onChange={handleChange}
            ></input>

            <label className="user-input__label">Confirm password</label>
            <input
              type="password"
              name="passwordConfirm"
              className="input__input"
              pattern=".{8,}"
              required
              value={userDetails.passwordConfirm}
              onChange={handleChange}
            ></input>

            <button className="input__btn" type="submit">
              {isLoading ? "...updating" : "save password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
