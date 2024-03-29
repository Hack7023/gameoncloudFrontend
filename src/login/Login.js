import React, { useEffect, useState } from "react";
import "./login.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [details, setDetails] = useState();

  const loginSelected = async () => {
    await Axios.post("https://gamesoncloudserver.azurewebsites.net/api/login", {
      username: username,
      password: password,
    }).then((response) => {
      try {
        setDetails(response.data[0].userName);
        navigate("/");
        sessionStorage.setItem("signedIn", "true");
        sessionStorage.setItem("Name", response.data[0].name);
        sessionStorage.setItem("memorygame", response.data[0].memoryGame);
        sessionStorage.setItem(
          "rockPaperScissor",
          response.data[0].rockPaperScissor
        );
        sessionStorage.setItem("flappy", response.data[0].flappy);
        sessionStorage.setItem("userName", response.data[0].userName);
        sessionStorage.setItem("suduku", response.data[0].suduku);

        // localStorage.setItem("userDate", response.data[0].userName);

        console.log(response.data[0]);
      } catch {
        alert("Id password doesn't match");
      }
    });
  };

  return (
    <div className="cover" style={{ marginLeft: "30%", marginTop: "50px" }}>
      <h1>Login</h1>
      <input
        required
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        type="text"
        placeholder="username"
      />
      <input
        required
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="password"
      />

      <button onClick={loginSelected} className="login-btn">
        Login
      </button>
      <h4>Or</h4>
      <button onClick={() => navigate("/signup")} className="login-btn">
        Signup
      </button>
    </div>
  );
};

export default Login;
