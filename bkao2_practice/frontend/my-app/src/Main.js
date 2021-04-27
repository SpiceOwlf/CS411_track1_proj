import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Userinfo from './Userinfo.js';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/userinfo' component={Userinfo}></Route>
    </Switch>
  );
}

function Home() {
    return (
        <h1>Main page</h1>
    );
}

export default Main;
