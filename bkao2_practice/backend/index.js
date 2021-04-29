const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

var db = mysql.createConnection({
    host:'35.184.123.230',
    user:'root',
    password:'123456',
    database:'pt1team25',
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.get("/api/get/", (require, response) => {
    const sqlSelect = require.query.sql;
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

app.get("/api/search", (require, response) => {
    const wid = !!require.query.wid?"%"+require.query.wid+"%":"%";
    const wname = !!require.query.wname?"%"+require.query.wname+"%":"%";
    const wurl = !!require.query.wurl?"%"+require.query.wurl+"%":"%";

    console.log(wid,wname,wurl);
    let sqlSelect = `Select Website.website_id,website_name,website_url,COALESCE(tempTable.total_left_in_website,0) as numProd
    FROM Website LEFT JOIN (SELECT website_id, sum(Product.Left_in_stock) as total_left_in_website 
    FROM Website NATURAL JOIN Product
    GROUP BY Website.website_id) tempTable USING (website_id)
    WHERE website_id
    like ? and website_name like ? and website_url like ?
    ORDER BY Website.website_id;`;
    db.query(sqlSelect, [wid,wname,wurl], (err, result) => {
        response.send(result);
    });
});

app.get("/api/login", (require, response) => {
    const username = require.query.username;
    const password = require.query.password;

    console.log(username,password);
    const sqlSelect = "Select * FROM User WHERE username=? and password=?"
    db.query(sqlSelect, [username,password], (err, result) => {
        response.send(result);
    });
});

app.post("/api/insert", (require, response) => {
    const wid = require.body.wid;
    const wname = require.body.wname;
    const wurl = require.body.wurl;
    console.log(wid, wname, wurl);
    const sqlInsert = "INSERT INTO `Website` (`website_id`, `website_name`, `website_url`) VALUES (?,?,?);";
    db.query(sqlInsert, [wid, wname, wurl], (error, result) => {
        console.log(error);
    });
});

app.delete("/api/delete/:wid", (require, response) => {
    const wid = require.params.wid;
    console.log("website is    "+ wid);
    const sqlDelete = "DELETE FROM Website WHERE website_id = ?;";
    db.query(sqlDelete, wid, (err, result) => {
        if (err)
        console.log(err);
    })
});

app.put("/api/deleteContains", (require, response) =>{
    const delete_sql = require.body.sql;
    console.log(delete_sql);
    db.query(delete_sql,(err, result) =>{
        if(err){
            console.log(err);
        }
    })
})


app.put("/api/update/", (require, response) => {
    /*
    const wid = require.body.wid;
    const wname = require.body.wname;
    const wurl = require.body.wurl;
    console.log("website is   " + wid);

    const sqlUpdate = "UPDATE `Website` SET `website_name` = ?, `website_url` = ? WHERE `website_id`= ?";
    */
    const sqlUpdate = require.body.sql;
    //db.query(sqlUpdate, [wname, wurl, wid], (err, result) => {
    db.query(sqlUpdate, (err, result) => {
        if (err)
            console.log(err);
    })
});

app.listen(3002, () => {
    console.log("running on port 3002...");
})
