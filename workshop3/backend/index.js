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

app.post("/api/insert", (require, response) => {
    const productName = require.body.productName;
    const leftInStock = require.body.leftInStock;
    const productPrice = require.body.productPrice;

    const sqlInsert = "INSERT INTO Product (product_name, Left_in_stock, product_price) VALUES (?,?,?)";
    db.query(sqlInsert, [productName, leftInStock, productPrice], (err, result) => {
        console.log(error);
    })
});

app.post("/api/insert", (require, response) => {
    const productName = require.body.productName;
    const leftInStock = require.body.leftInStock;
    const productPrice = require.body.productPrice;

    const sqlInsert = "INSERT INTO Product (product_name, Left_in_stock, product_price) VALUES (?,?,?)";
    db.query(sqlInsert, [productName, leftInStock, productPrice], (err, result) => {
        console.log(error);
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

app.listen(3002, () => {
    console.log("running on port 3002");
})