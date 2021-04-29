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

app.get("/api/product_search", (require, response) => {
    const name = !!require.query.pname?"%"+require.query.pname+"%":"%";

    console.log(name);
    let sqlSelect = `Select * FROM Product NATURAL JOIN Website
    WHERE product_name
    like ?;`;
    db.query(sqlSelect, [name], (err, result) => {
        response.send(result);
    });
});

app.get("/api/login", (require, response) => {
    const username = require.query.username;
    const password = require.query.password;

    console.log(username,password);
    const sqlSelect = "Select * FROM User WHERE username=? and password=?";
    db.query(sqlSelect, [username,password], (err, result) => {
        response.send(result);
    });
});

app.get("/api/wishlist_check", (require, response) => {
    const wishlist_id = require.query.wishlist_id;
    const product_id = require.query.product_id;

    const sqlSelect = "Select * FROM Contains WHERE wishlist_id=? and product_id=?";
    db.query(sqlSelect, [wishlist_id, product_id], (error, result) => {
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

app.post("/api/contains_insert_new", (require, response) => {
    const wishlist_id = require.body.wishlist_id;
    const product_id = require.body.product_id;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    const add_date = yyyy + '-' + mm + '-' + dd;
    console.log(wishlist_id, product_id, add_date);
    const sqlInsert = "INSERT INTO `Contains` (wishlist_id, product_id, add_date) VALUES (?, ?, ?);";
    db.query(sqlInsert, [wishlist_id, product_id, add_date], (error, result)=> {
        console.log(error);
    });
})

app.post("/api/contains_insert", (require, response) => {
    const wishlist_id = require.body.wishlist_id;
    const product_id = require.body.product_id;
    var exist = false;

    const sqlSelect = "SELECT * FROM `Contains` WHERE wishlist_id=? AND product_id = ?;";
    db.query(sqlSelect, [wishlist_id, product_id], (error, result) => {
        if (result.length > 0){
            console.log(1)
            exist = true;
        }
        console.log("length: " + result.length)
        console.log("exist: " + exist)
        if (!exist){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            const add_date = yyyy + '-' + mm + '-' + dd
            console.log(wishlist_id, product_id, add_date);
            const sqlInsert = "INSERT INTO `Contains` (wishlist_id, product_id, add_date) VALUES (?, ?, ?);";
            db.query(sqlInsert, [wishlist_id, product_id, add_date], (error, result)=> {
                console.log(error);
            });
        }
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
