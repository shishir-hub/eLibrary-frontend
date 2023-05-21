import React, { useContext } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LibraryContext } from "../../App";

function Login() {
  const navigate = useNavigate();

  const { setIsLoading, setUser } = useContext(LibraryContext);

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
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        setUser(res.data.data);
        navigate("/");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
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
