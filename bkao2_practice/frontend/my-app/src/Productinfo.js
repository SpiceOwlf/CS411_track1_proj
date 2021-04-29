import React, {useState, useEffect} from 'react';
import './App.css';
import { Link, useRouteMatch } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from "./App.js";

function Productinfo(props) {
    const [pid, setPid] = useState('');
    const [wid, setWid] = useState('');
    const [LIS, setLIS] = useState('');
    const [pname, setPname] = useState('');
    const [pprice, setPprice] = useState('');
    const [wlcheck, setWLcheck] = useState(true);
    const [reload, setReload] = useState(true);
    let auth = useAuth();
    //const { id } = useParams();
    const routeMatch = useRouteMatch("/productinfo/:id");

    //console.log(routeMatch);

    useEffect(() => {
        //const {cpid} = useParams();
        let sql = "SELECT * FROM Product WHERE product_id='" + routeMatch.params.id+"'";
        //console.log(sql);
        Axios.get(`http://localhost:3002/api/get`, {
            params: {
                sql: sql
            }
        }).then((response) => {
            console.log(response.data);
            (response.data).forEach((val,ind) => {
                setPid(routeMatch.params.id);
                setPname(val.product_name);
                setWid(val.website_id);
                setLIS(val.Left_in_stock);
                setPprice(val.product_price);
            })
            Axios.get(`http://localhost:3002/api/wishlist_check`, {
                params: {
                    wishlist_id: auth.user.wishlist_id,
                    product_id: routeMatch.params.id
                }
            }).then((response) => {
                //console.log(response.data.length);
                if(response.data.length>0){
                    //setWLcheck(false);
                    document.getElementById("addWL").disabled = true;
                }
                else document.getElementById("addWL").disabled = false;
            })
        })
    },[auth.user, reload])

    const addWishlist = (pid) => {
        Axios.post(`http://localhost:3002/api/contains_insert_new`, {
            wishlist_id: auth.user.wishlist_id,
            product_id: pid
        }).then(() => {
            alert('Successfully added to your wishlist!')
        });
        setReload(!reload)
    }

    return (
      <div className="list">
        <p>
          <b>Product ID: {pid}</b> <br />
             Prduct Name: {pname} <br />
             Product price: {pprice} <br />
             Left in Stock: {LIS} <br />
        </p>
        <Link to="/">
          <button type="button">Return</button>
        </Link>
        <button id="addWL" onClick={() => {
            addWishlist(pid)
        }}>Add To Wishlist</button>
      </div>
    );
}

export default Productinfo;
