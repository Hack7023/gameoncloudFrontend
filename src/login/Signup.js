import React, { useEffect, useState } from "react";
import "./signup.css";
import Axios from "axios";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signupform = () => {
  const navigate = useNavigate();
  const [popupStyle, showPopup] = useState("hide");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const submithandler = () => {
    Axios.post("http://localhost:3003/api/insertuser", {
      email: email,
      password: password,
      name: name,
      username: username,
    }).then((e) =>
      e.data === "ER_DUP_ENTRY"
        ? alert("username already selected")
        : (alert("registration successfull "), navigate("/login"))
    );
  };

  return (
    <div className="cover" style={{ marginLeft: "30%", marginTop: "50px" }}>
      <h1>Signup</h1>
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        type="text"
        placeholder="username"
      />
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name"
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="New Password"
      />

      <button className="login-btn" onClick={submithandler}>
        Signup
      </button>
    </div>
  );
};

export default Signupform;
