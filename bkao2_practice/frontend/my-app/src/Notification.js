import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from "./App.js";

function Notification() {
    const [NotificationList, setNotificationList] = useState([]);
    const [pagenum, setPagenum] = useState(1);
    const pageiter = 20;
    const [maxpage, setMaxpage] = useState(1);
    const [OnMount, setOnMount] = useState(true);
    let auth = useAuth();
  
    useEffect(() => {
      setMaxpage(Math.ceil(NotificationList.length/pageiter));
      if (maxpage<pagenum) setPagenum(1);
      document.getElementById("pagenum").value=pagenum;
      if (OnMount) submitSearch();
      setOnMount(false);
    },[maxpage,pagenum,NotificationList])
  
    const submitSearch = () => {
        let sql = "SELECT * FROM Notification WHERE user_id=" + auth.user.user_id + " ORDER BY datetime DESC, left_in_stock;";
        console.log(sql);
        Axios.get(`http://localhost:3002/api/get`, {
            params: {
                sql: sql
            }
        }).then((response) => {
            setNotificationList(response.data);
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
      <h1> Notifications </h1>
      <div className="form">
        <br />
        <div>
          <button onClick={() => {Setpage(pagenum-1)}}> &lt; </button>
          <input type="number" id="pagenum" defaultValue={pagenum} min="1" max={maxpage} onKeyUp={(event) =>
          {Selectpage(event)}}/>
          <button onClick={() => {Setpage(pagenum+1)}}> &gt; </button>
          <label> {maxpage} </label>
        </div>
        {
        NotificationList.map((val,ind) => {
          if (ind < pagenum * pageiter && ind >= (pagenum-1) * pageiter){
          return (
            <div className="list">
              <p>
                <b> Subject: {val.subject} <br /></b> <br /> <br />
                    {val.website_name} <br />
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

  export default Notification;