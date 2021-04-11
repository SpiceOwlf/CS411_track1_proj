import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  const [productName, setProductName] = useState('');
  const [productData, setProductData] = useState([]);
  const [leftInStock, setLeftInStock] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [website, setWebsite] = useState('');
  const [newLeftInStock, setNewLeftInStock] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [user, setUser] = useState('');
  const [userData, setUserData] = useState([]);

  const getProduct = (productName) => {
    Axios.get(`http://localhost:3002/api/get/${productName}`).then((response) => {
      setProductData(response.data)
    });
  };

  const deleteProduct = (productName) => {
    Axios.delete(`http://localhost:3002/api/delete/${productName}`);
  };

  const updateStock = (productName) => {
    Axios.put(`http://localhost:3002/api/update`, {
      productName: productName,
      leftInStock: newLeftInStock
    });
    setNewLeftInStock("")
  };

  const insertProduct = () => {
    Axios.post(`http://localhost:3002/api/insert`, {
      productName: newProductName,
      leftInStock: leftInStock,
      productPrice: productPrice,
      website: website
    }).then(() => {
      alert('successful insertion!')
    });
  };

  const getUserData = (user) => {
    Axios.get(`http://localhost:3002/api/advanced/${user}`).then((response) => {
      setUserData(response.data)
    });
  };

  return (
    <div className="App">
      <h1> CRUD APPLICATIONS </h1>
      <h2> search </h2>
      <div className="form">
        <label> Product Name: </label>
        <input type="text" name="productName" onChange={(e) => {
          setProductName(e.target.value)
        }}/>
        <button onClick={getProduct(productName)}> Search </button>
        {productData.map((val) => {
          return (
            <div className = "card">
              <h1>Product Name: {val.product_name} </h1>
              <p>Left In Stock: {val.Left_in_stock}</p>
              <p>Product Price: {val.product_price}</p>
              <p>Website ID: {val.website_id}</p>
              <button onClick={() => { deleteProduct(val.product_name) }}> Delete Product</button>
              <input type="text" id="updateLeftInStock" onChange={(e) => {
                setNewLeftInStock(e.target.value)
              } }/>
              <button onClick={() => { updateStock(val.product_name) }}> Update Left In Stock</button>
            </div>
          );
        })}
      </div>
      <div>
      <h2> insert </h2>
      <label> Product Name: </label>
        <input type="text" id="insertProductName" onChange={(e) => {
          setNewProductName(e.target.value)
        }}/>
      <label> Left In Stock: </label>
         <input type="text" id="insertLeftInStock" onChange={(e) => {
          setLeftInStock(e.target.value)
        }}/>
      <label> Price: </label>
         <input type="text" id="insertProductPrice" onChange={(e) => {
          setProductPrice(e.target.value)
        }}/>
      <label> Website ID: </label>
         <input type="text" id="insertWebsite" onChange={(e) => {
          setWebsite(e.target.value)
      }}/>
      <button onClick={() => { insertProduct() }}> Insert</button>
      </div>

      <div>
      <h2> advanced query </h2>
      <label> User ID: </label>
        <input type="text" id="user_id" onChange={(e) => {
          setUser(e.target.value)
        }}/>
      
      <button onClick={ getUserData(user) }> Submit </button>
      {userData.map((val) => {
          return (
            <div className = "card2">
              <p>Product Name: {val.product_name} </p>
              <p>Add Date: {val.add_date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
