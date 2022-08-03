import { useState } from "react";

const defaultSignupFields = {
  userName: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const Signup = () => {
  const [signupFields, setSignupFields] = useState(defaultSignupFields);
  const { userName, email, password, passwordConfirm } = signupFields;

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reportValidity();
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "userName":
        setSignupFields({
          ...signupFields,
          [event.target.name]: event.target.value,
        });
        break;

      case "email":
        setSignupFields({
          ...signupFields,
          [event.target.name]: event.target.value,
        });
        break;
      case "password":
        setSignupFields({
          ...signupFields,
          [event.target.name]: event.target.value,
        });
        break;
      case "passwordConfirm":
        setSignupFields({
          ...signupFields,
          [event.target.name]: event.target.value,
        });
        if (signupFields.password !== signupFields.passwordConfirm) {
          event.target.setCustomValidity(
            "Confirmed password doesn't match password"
          );
          // event.target.reportValidity();
        }
        break;
      default:
        console.log("Check");
    }
  };

  return (
    <div className="signup">
      <h3>Signup for an account</h3>
      <form className="signup__form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="userName"
          placeholder="John Doe"
          value={userName}
          onChange={handleChange}
          required
        />

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

        <label>Password Confirm</label>
        <input
          type="password"
          name="passwordConfirm"
          required
          pattern=".{8,}"
          placeholder="********"
          onChange={handleChange}
          value={passwordConfirm}
        />

        <button className="signup__btn" type="submit">
          SIGNUP
        </button>
      </form>
    </div>
  );
};

export default Signup;
