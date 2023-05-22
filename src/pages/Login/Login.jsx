import React, { useContext } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LibraryContext } from "../../App";

function Login() {
  const navigate = useNavigate();

  const { setIsLoading, setUser, alert, setAlert } = useContext(LibraryContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    let data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, data)
      .then((res) => {
        setAlert({
          isOpen: true,
          message: "Logged in Successfully",
          type: "success",
        });
        localStorage.setItem("token", res.data.token);
        setUser(res.data.data);
        navigate("/");
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
    <div className="login-wrapper">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h3>Login</h3>
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
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
