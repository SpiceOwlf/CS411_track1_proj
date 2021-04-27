import react from 'react';
import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const signup = () => {
    Axios.post(`http://localhost:3002/api/signup`, {
      username: username,
      password: password,
      email: email,
      phoneNumber: phoneNumber,
    });
  }

  return (
    <div className="App">
    <h1 style={{display: "flex", justifyContent: "center", alignItems: "center"}}> Sign Up </h1>
    <div className="form">
      <div style={{padding: 10, display: "flex", justifyContent: "center", alignItems: "center"}}> 
        <label> Username: </label>
        <input type="text" name="Username" onChange={(e) => {
          setUsername(e.target.value)
        }}/>
      </div>
      <div style={{padding: 10, display: "flex", justifyContent: "center", alignItems: "center"}}>
        <label> Password: </label>
        <input type="text" name="Password" onChange={(e) => {
          setPassword(e.target.value)
        }}/>
      </div>
      <div style={{padding: 10, display: "flex", justifyContent: "center", alignItems: "center"}}>
      <label> Email: </label>
      <input type="text" name="Email" onChange={(e) => {
        setEmail(e.target.value)
      }}/>
      </div>
      <div style={{padding: 10, display: "flex", justifyContent: "center", alignItems: "center"}}>
      <label> Phone Number: </label>
      <input type="text" name="PhoneNumber" onChange={(e) => {
        setPhoneNumber(e.target.value)
      }}/>
      </div>
      <div style={{padding: 10, display: "flex", justifyContent: "center", alignItems: "center"}}>
      <div style={{padding: 10}}><button onClick={() => signup()}> Sign Up </button></div>
      </div>
    </div>
    </div>
  );
}

export default Signup;
