const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

var db = mysql.createConnection({
<<<<<<< HEAD
<<<<<<< HEAD
    host: 'ip',
    user: 'root',
    password: 'pw',
=======
    host: '35.184.123.230',
    user: 'root',
    password: '123456',
>>>>>>> acb1964... connect to db
=======
    host: 'ip',
    user: 'root',
    password: 'pw',
>>>>>>> 37e23ce... connect to db
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


app.listen(3002, () => {
    console.log("running on port 3002");
})