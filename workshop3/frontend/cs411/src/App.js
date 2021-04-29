import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  const [page, setPage] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [badPassword, setBadPassword] = useState(false)

  const login = () => {
    Axios.get(`http://localhost:3002/api/login/${username}`)
    .then((response) => {
      response.data.map((val => {
        if (password == val.password) {
          setPage(3);
        }
      }))
    });
    setBadPassword(true);
  }

  const signup = () => {
    Axios.post(`http://localhost:3002/api/signup`, {
      username: username,
      password: password,
      email: email,
      phoneNumber: phoneNumber,
    }).then(() => {
      alert('successful insertion!')
    });
  }

  if (page == 1) {
    return (
      <div className="App">
      <h1 style={{padding: 10, display: "flex", justifyContent: "center", alignItems: "center"}}> Login </h1>
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
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          {badPassword ? <p> Incorrect username or password.</p> : null}
        </div>
        <div style={{padding: 10, display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div style={{padding: 10}}><button onClick={() => login()}> Login </button></div>
          <div style={{padding: 10}}><button onClick={() => setPage(2)}> Sign Up As A New User</button></div>
        </div>
      </div>
    </div>
    );
  } else if (page == 2) {
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
        <div style={{padding: 10}}><button onClick={() => setPage(1)}> Go Back To Login </button></div>
        </div>
      </div>
      </div>
    );
  } else {
    return (
      <h3>user info</h3> 
    );
  }
}

export default App;
