import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  const [name, setCafeName] = useState('');
  const [addr, setAddr] = useState('');
  const [license, setLicense] = useState('');

  const submitCafe = () => {
    Axios.post('http://localhost:3002/api/insert', {
      name: name,
      addr: addr,
      license: license
    }).then(() => {
      alert('successful insertion!')
    })
  };

  return (
    <div className="App">
      <h1>Cafe Shop Example</h1>

      <div className="form">
        <label> Cafe Name: </label>
        <input type="text" name="name" onChange={(e) =>
          {setCafeName(e.target.value)}
        }/>
        <label> Address: </label>
        <input type="text" name="addr" onChange={(e) =>
          {setAddr(e.target.value)}
        }/>
        <label> License: </label>
        <input type="text" name="license" onChange={(e) =>
          {setLicense(e.target.value)}
        }/>

        <button onClick={submitCafe}> Submit </button>
      </div>

    </div>
  );
}

export default App;
