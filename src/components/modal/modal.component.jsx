import { useState, useEffect } from "react";

const Modal = ({ loggedIn, status }) => {
  const [hide, setHide] = useState(true);

  const switchStyle = (param) => {
    switch (param) {
      case "success":
        return "modal-success";
      case "Incorrect Email or password":
        return "modal-failure";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (loggedIn || status) {
      setHide(false);
      const timeId = setTimeout(() => setHide(true), 2000);

      return () => {
        clearTimeout(timeId);
      };
    }
  }, [status, loggedIn]);

  return hide ? null : (
    <div className={`modal ${switchStyle(status)}`}>{status}</div>
  );
};

export default Modal;
