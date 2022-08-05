import { useEffect, useState, useRef } from "react";

const defaultSignupFields = {
  userName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  passwordMismatch: false,
};

const Signup = () => {
  const confirmRef = useRef(null);
  const [signupFields, setSignupFields] = useState(defaultSignupFields);
  const { userName, email, password, passwordConfirm, passwordMismatch } =
    signupFields;

  console.log(
    "OBEN",
    passwordMismatch,
    password,
    passwordConfirm,
    confirmRef.current
  );

  useEffect(() => {
    setSignupFields({
      ...signupFields,
      passwordMismatch: password !== passwordConfirm ? true : false,
    });
  }, [password, passwordConfirm]);

  useEffect(() => {
    confirmRef.current.setCustomValidity(
      passwordMismatch ? "Confirmed password must match password" : ""
    );
  }, [passwordMismatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMITTED");
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
          ref={confirmRef}
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
