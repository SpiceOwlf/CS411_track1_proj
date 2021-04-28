import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Userinfo from './Userinfo.js';
import Axios from 'axios';

const load_product = () => {
  Home.submitSearch();
}

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home} onEnter={load_product}></Route>
      <Route exact path='/userinfo' component={Userinfo}></Route>
    </Switch>
  );
}

function Home() {
  const [websiteid, setWebsite] = useState(0);
  const [stock, setStock] = useState(0);
  const [name, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [productList, setProductList] = useState([]);
  const [pagenum, setPagenum] = useState(1);
  const pageiter = 20;
  const [maxpage, setMaxpage] = useState(1);
  const [OnMount, setOnMount] = useState(true);

  useEffect(() => {
    setMaxpage(Math.ceil(productList.length/pageiter));
    if (maxpage<pagenum) setPagenum(1);
    document.getElementById("pagenum").value=pagenum;
    if (OnMount) submitSearch();
    setOnMount(false);
  },[maxpage,pagenum,productList])

  const submitSearch = () => {
    Axios.get(`http://localhost:3002/api/product_search`, {
      params: {
        pname: name
      }
    }).then((response) => {
      setProductList(response.data);
    });
  };

  window.onload = function() {
    submitSearch();
  }

  const Setpage = (num) => {
    if (num>=1 && num<=maxpage){
      setPagenum(num);
    }
  };

  const Selectpage = (e) => {
    var edValue = document.getElementById("pagenum");
    var s = edValue.value;
    console.log("e=",e.KeyCode);
    if (e.KeyCode === 13){
      console.log("s=",s);
      e.preventDefault();
      setPagenum(s);
    }
  };

  return (
    <div className="App">
    <h1> Main Page </h1>
    <div className="form">
      <label> Product Name: </label>
      <input type="text" name="name" onChange={(e) => {
          setProductName(e.target.value)
      }}/>

      <button onClick={submitSearch}> Search </button>
      
      <br />
      <div>
        <button onClick={() => {Setpage(pagenum-1)}}> &lt; </button>
        <input type="number" id="pagenum" defaultValue={pagenum} min="1" max={maxpage} onKeyUp={(event) =>
        {Selectpage(event)}}/>
        <button onClick={() => {Setpage(pagenum+1)}}> &gt; </button>
        <label> {maxpage} </label>
      </div>
      {
      productList.map((val,ind) => {
        if (ind < pagenum * pageiter && ind >= (pagenum-1) * pageiter){
        return (
          <div className="list">
            <p>
              <b> Product Name: {val.product_name} <br />
                  Price: {val.product_price}</b> <br /> <br />
                  From: {val.website_name} <br />
                  Website Url: {val.website_url} 
            </p>
          </div>
        );
        }
        else return "";
        
        ;
      })
      }
    </div>
  </div>
      
  );
}

export default Main;
