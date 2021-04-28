import React, {useState, useEffect} from "react";
import { Switch, Route } from 'react-router-dom';
import Userinfo from './Userinfo.js';
import { useAuth } from "./App.js";
import Wishlist from './Wishlist.js';

import Axios from 'axios';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/userinfo' component={Userinfo}></Route>
      <Route exact path='/wishlist' component={Wishlist}></Route>
    </Switch>
  );
}

function Home() {




    


    return (
        <div className = "App">
        <h1>Main page</h1>
      
        <br></br>
        
        
        </div>
    );
}

export default Main;
