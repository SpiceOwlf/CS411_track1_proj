import react from 'react';
import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [success, setSuccess] = useState(false);

  const signup = () => {
    const req = "INSERT INTO User (username, password, email, phone_num) VALUES (\"" + username + "\",\"" + password + "\",\"" + email + "\",\"" + phoneNumber + "\")";
    Axios.get(`http://localhost:3002/api/get`, {
      params: {sql: req}
    }).then((response) => {
      if (response.data != "") setSuccess(true);
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
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          {success ? <p> Sign Up Successful.</p> : null}
      </div>
    </div>
    </div>
  );
}

export default Signup;
