import React, { useContext } from "react";
import "./Signup.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LibraryContext } from "../../App";

function Signup() {
  const { setIsLoading, alert, setAlert } = useContext(LibraryContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let data = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, data)
      .then((res) => {
        setAlert({
          isOpen: true,
          message: "User Created Successfully",
          type: "success",
        });
        navigate("/login");
        setIsLoading(false);
      })
      .catch((err) => {
        setAlert({
          isOpen: true,
          message: "Something went wrong!",
          type: "danger",
        });
        setIsLoading(false);
      });

    setTimeout(() => {
      setAlert({ ...alert, isOpen: false });
    }, 5000);
  };
  return (
    <div className="signup-wrapper">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h3>Register </h3>
        <div className="inputs">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            required
            placeholder="Enter your username"
          />
        </div>
        <div className="inputs">
          <label htmlFor="email">Email</label>
          <input name="email" type="email" required placeholder="Enter Email" />
        </div>
        <div className="inputs">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            required
            placeholder="Enter your password"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
