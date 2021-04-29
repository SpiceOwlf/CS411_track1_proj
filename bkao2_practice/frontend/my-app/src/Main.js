import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Userinfo from './Userinfo.js';
import Notification from './Notification.js'
import Home from './Home.js';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/notification' component={Notification}></Route>
      <Route exact path='/userinfo' component={Userinfo}></Route>
    </Switch>
  );
}

export default Main;
