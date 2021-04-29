import React, {useState, useEffect} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from "./App.js";

function Wishlist(){
    let auth = useAuth();
    const [deletsql, setdeletsql] = useState('');
    
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


    const deleteFromContain = (wishlist_id, product_id) =>{
        
        let sql = "DELETE FROM Contains WHERE wishlist_id =" + wishlist_id +" AND product_id = \""+product_id +"\"";
        setdeletsql(product_id);
        console.log(sql);
        Axios.put(`http://localhost:3002/api/deleteContains`,{       
                    sql:sql
        });
        alert(deletsql + "deleted successfully!");

        
        setwishlistitem(wishlistitem.filter(val => val.product_id !== product_id));

    };

    return (
        <div className = "App">
        <h1>wishlist page</h1>
      
        <br></br>
        
        {wishlistitem.map((val)=>{
            // console.log("in dom element, val " + val.product_id);
            // console.log(val);
            return(
                <div className = "card">
                    {/* <p>Wishlist id:{val.wishlist_id} </p> */}
                      <p> Wishlist Item: {val.product_id} </p>
                      <p>  add_date:{val.add_date} </p>
                      <p> priority: {val.priority} </p>
                      {/* <button> Delete</button> */}
                      
                      <button onClick={() => {deleteFromContain(val.wishlist_id, val.product_id) }}> Delete</button>
                </div>

            );
        })}
        </div>
    );
}

export default Wishlist;