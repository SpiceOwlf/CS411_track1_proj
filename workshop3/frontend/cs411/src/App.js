import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  const [productName] = useState('fd27d80d9931f5e');
  const getPeview = (productName) => {
    Axios.get(`http://localhost:3002/api/get/${productName}`);
  };

  return (
    <div className="App">
      <h1> CRUD APPLICATIONS </h1>

      <h2> READ </h2>
      <div className="form">
        <label> Product Name: </label>
        <input type="text" name="productName"/>
      </div>
    </div>
  );
}

export default App;
