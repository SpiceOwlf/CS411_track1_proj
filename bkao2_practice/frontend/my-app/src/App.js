import React, { useContext, createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import Axios from 'axios';
import Signup from './Signup';
import Main from './Main';

const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (username, password) => {
    let u = {}
    Axios.get(`http://localhost:3002/api/login`, {
        params: {
            username: username,
            password: password
        }
    }).then((response) => {
        if(response.data.length>0){
            (response.data).forEach((val,ind) => {
                u.user_id=val.user_id;
                u.username=val.username;
                u.wishlist_id=val.wishlist_id
            });
            setUser(u);
            //console.log(Object.keys(user));
        }
    });
    return u;
  };

  const signout = () => {
    //return (() => {
      setUser(null);
    //});
  };

  return {
    user,
    signin,
    signout
  };
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {
    let auth = useAuth();

    return (
      <div className="App">
        <ProvideAuth>
          <Router>
            <Nav />
            <br />
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup" component={Signup} />
              <PrivateRoute path="/">
                <Main />
              </PrivateRoute>
             </Switch>
           </Router>
         </ProvideAuth>
      </div>
    );
}

function Nav() {
    let history = useHistory();
    let auth = useAuth();
    
    //if(auth.user) console.log(Object.keys(auth.user));

    return auth.user ? (
      <nav>
        <h3>
          <Link to="/">Home</Link>
        </h3>
        <ul className="nav-links">
            <li>
            <Link to="/wishlist">wishlist</Link>
            </li>
          <li>
            <Link to="/notification">Notification Center</Link>
          </li>
          <li>
            <label>Welcome! </label>
            <Link to="/userinfo">{auth.user.username}</Link>
          </li>
          <li>
            <button onClick={() => {
                auth.signout(() => history.push("/"));
            }}>
              Sign out
            </button>
          </li>
        </ul>
      </nav>
    ) : (
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/login">log in</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </ul>
      </nav>
    );
}

function Login() {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
    const [username, setUN] = useState(null);
    const [password, setPW] = useState(null);
    //var user = {};

    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {
      auth.signin(username, password);
      /*
      auth.signin(() => {
        history.replace(from);
        Axios.get(`http://localhost:3002/api/login`, {
            params: {
                username: username,
                password: password
            }
        }).then((response) => {
            if(response.data.length>0){
                (response.data).forEach((val,ind) => {
                    user['user_id']=val.user_id;
                    user['username']=val.username;
                    user['wishlist_id']=val.wishlist_id;
                })
                return user;
            }
            else return user = {};
        });
      });
      */
    };

    return (
      <div>
        {auth ? (auth.user ? <Redirect to={from} /> : <label />) : <label />}
        <label>Username: </label>&emsp;
        <input type="text" name="username" defaultValue="" onChange={(e) => {
          setUN(e.target.value);
        }} /> <br />
        <label>Password: </label>&emsp;
        <input type="password" name="password" defaultValue="" onChange={(e) => {
          setPW(e.target.value);
        }} /> <br />
        <button onClick={login}>Log in</button>
      </div>
  );
}

export default App;
