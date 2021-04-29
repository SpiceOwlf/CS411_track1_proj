import React, {useState, useEffect} from 'react';
import './App.css';
//import {Link} from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from "./App.js";

function Userinfo() {
    const [uid, setUid] = useState('');
    const [uname, setUname] = useState('');
    const [newUN, setNewUN] = useState('');
    //const [password, setPW] = useState('');
    const [newPW, setNewPW] = useState('');
    const [phonenum, setPN] = useState('');
    const [newPN, setNewPN] = useState('');
    const [email, setEmail] = useState('');
    const [newEM, setNewEM] = useState('');
    const [wishlist, setWL] = useState('');
    const [reload, setReload] = useState(true);
    let auth = useAuth();

    useEffect(() => {
        let sql = "SELECT * FROM User WHERE user_id=" + auth.user.user_id;
        console.log(sql);
        Axios.get(`http://localhost:3002/api/get`, {
            params: {
                sql: sql
            }
        }).then((response) => {
            (response.data).forEach((val,ind) => {
                setUid(auth.user.user_id);
                setUname(auth.user.username);
                //setPW(val.password);
                setPN(val.phone_num);
                setEmail(val.email);
                setWL(val.wishlist_id);
            })
        })
    },[auth.user, reload])

    const updateUser = () => {
        let is_first_attribute=true;
        let sql = "UPDATE User SET "
        if(newUN!==""){
            sql += "username="+newUN;
            is_first_attribute = false;
        }
        if(newPW!==""){
            if(is_first_attribute) is_first_attribute = false;
            else sql += ", ";
            sql += "password="+newPW;
        }
        if(newPN!==""){
            if(is_first_attribute) is_first_attribute = false;
            else sql += ", ";
            sql += "phone_num="+newPN;
        }
        if(newEM!==""){
            if(is_first_attribute) is_first_attribute = false;
            else sql += ", ";
            sql += "email="+email;
        }
        sql += " WHERE user_id="+uid;
        Axios.put(`http://localhost:3002/api/update`, {
            sql: sql
        });

        //document.getElementById("pagenum");
        setNewUN("");
        setNewPW("");
        setNewPN("");
        setNewEM("");
        setReload(!reload);
    }

    return (
      <div className="list">
        <p>
          <b>User ID: {uid} <br />
             User name: {uname}
             <input type="text" id="newUN" defaultValue="" onChange={(e) => {
               setNewUN(e.target.value);
             }} /></b>  <br />
             Phone number: {phonenum}
             <input type="text" id="newPN" defaultValue="" onChange={(e) => {
               setNewPN(e.target.value);
             }} /> <br />
             Email: {email}
             <input type="text" id="newEM" defaultValue="" onChange={(e) => {
               setNewEM(e.target.value);
             }} /> <br />
             Wishlist: {wishlist} <br />
             <br />
             Reset password:
             <input type="password" id="newPW" defaultValue="" onChange={(e) => {
               setNewPW(e.target.value);
             }} />
        </p>
        <button onClick={() => {
            updateUser();
        }}>Update</button>
      </div>
    );
}

export default Userinfo;
