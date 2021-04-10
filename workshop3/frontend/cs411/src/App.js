import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  const [productName, setProductName] = useState('');
  const [productData, setProductData] = useState([]);

  const getProduct = (productName) => {
    Axios.get(`http://localhost:3002/api/get/${productName}`).then((response) => {
      setProductData(response.data)
    });
  };

  return (
    <div className="App">
      <h1> CRUD APPLICATIONS </h1>

      <h2> READ </h2>
      <div className="form">
        <label> Product Name: </label>
        <input type="text" name="productName" onChange={(e) => {
          setProductName(e.target.value)
        }}/>
        <button onClick={getProduct(productName)}> Submit</button>
        {productData.map((val) => {
          console.log(productData);
          return (
            <div className = "card">
              <h1>Product Name: {val.product_name} </h1>
              <p>Left In Stock: {val.Left_in_stock}</p>
              <p>Price: {val.product_price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
