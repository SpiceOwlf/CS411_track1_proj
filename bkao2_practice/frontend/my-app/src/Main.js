import React, {useState, useEffect} from "react";
import { Switch, Route } from 'react-router-dom';
import Userinfo from './Userinfo.js';
import Axios from 'axios';
import { useAuth } from "./App.js";



const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/userinfo' component={Userinfo}></Route>
    </Switch>
  );
}

function Home() {

    let auth = useAuth();
    
    const [wishlistitem, setwishlistitem] = useState([]);



    useEffect(() => {

        let sql = "SELECT * FROM Contains WHERE wishlist_id=" + auth.user.wishlist_id;
        console.log(sql);
        Axios.get(`http://localhost:3002/api/get`, {
            params: {
                sql: sql
            }
        }).then((response) => {
            (response.data).forEach((val,ind) => {
                console.log("val is: " + val.product_id);

                setwishlistitem([
                    ...wishlistitem,
                    {
                        product_id: val.product_id,
                        add_date: val.add_date,
                        priority: val.priority
                    }
                ]);
            })
        })
    },[auth.user])
    


     console.log(wishlistitem);
    return (
        <div className = "App">
        <h1>Main page</h1>
      
        <br></br>
        
        {wishlistitem.map((val)=>{
            // console.log("in dom element, val " + val.product_id);
            // console.log(val);
            return(
                <div className = "card">
                      <p> Wishlist Item: {val.product_id} </p>
                      <p>  add_date:{val.add_date} </p>
                      <p> priority: {val.priority} </p>
                </div>

            );
        }

        )

        }
        </div>
    );
}

export default Main;
