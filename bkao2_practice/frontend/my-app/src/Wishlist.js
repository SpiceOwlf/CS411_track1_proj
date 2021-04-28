import React, {useState, useEffect} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from "./App.js";

function Wishlist(){
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
                setwishlistitem(wishlistitem=>[...wishlistitem, val]);

             
            })
        })
    },[auth.user])
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

export default Wishlist;