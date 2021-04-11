const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

var db = mysql.createConnection({
    host: '35.184.123.230',
    user: 'root',
    password: '123456',
    database: 'pt1team25'
})

// app.get('/', (require, response) => {
//     const sqlInsert = "INSERT INTO Cafe (name, addr, license) VALUES ('test_shop', 'test_addr', 'test_license')";
//     db.query(sqlInsert, (err, result) => {
//         response.send (result);
//     })
// })

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/get/:productName", (require, response) => {
    const productName = require.params.productName;
    const sqlSelect = "SELECT * FROM Product WHERE product_name = ?";
    db.query(sqlSelect, [productName], (err, result) => {
        response.send(result);
    })
});

app.delete("/api/delete/:productName", (require, response) => {
    const productName = require.params.productName;

    const sqlDelete = "DELETE FROM Product WHERE product_name = ?";
    db.query(sqlDelete, productName, (err, result) => {
        if (err) 
        console.log(error);
    })
});

app.post("/api/insert/", (require, response) => {
    console.log("inserting");
    const productName = require.body.productName;
    const leftInStock = require.body.leftInStock;
    const productPrice = require.body.productPrice;
    const website = require.body.website;
    console.log(productName, leftInStock, productPrice);
    const sqlInsert = "INSERT INTO Product (product_id, product_name, Left_in_stock, product_price, website_id) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [productName, productName, leftInStock, productPrice, website], (err, result) => {
        console.log(err);
    })
});

app.put("/api/update/", (require, response) => {
    const productName = require.body.productName;
    const leftInStock = require.body.leftInStock;

    const sqlUpdate = "UPDATE Product SET Left_in_stock = ? WHERE product_name = ?";
    db.query(sqlUpdate, [leftInStock, productName], (err, result) => {
        if (err) 
        console.log(error);
    })
});

app.get("/api/advanced/:userId", (require, response) => {
    const userId = require.params.userId;
    console.log(userId);
    const sqlSelect = "SELECT user_id, product_name, add_date FROM (SELECT * FROM User NATURAL JOIN Contains NATURAL JOIN Product) as wish WHERE user_id = ? AND add_date IN (SELECT MAX(add_date) FROM (SELECT * FROM User NATURAL JOIN Contains NATURAL JOIN Product) as wish1)";
    db.query(sqlSelect, [userId], (err, result) => {
        response.send(result);
    })
});





app.listen(3002, () => {
    console.log("running on port 3002");
})