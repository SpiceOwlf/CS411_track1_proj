const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { response } = require("express");

var db = mysql.createConnection(
    {
        host: '35.184.123.230',
        user: 'root',
        password: '123456',
        database: 'cafeshopes'
    }
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// app.get('/', (require, response) => {
//     const sqlselect = "SELECT * FROM Cafe"
//     db.query(sqlselect, (err, result) => {
//         response.send(result);
//     })
// })


app.get("/api/get", (require, response) => {
    const sqlSelect = "SELECT * FROM Cafe";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});



app.post('/api/insert', (require, response) => {
    const name = require.body.name;
    const addr = require.body.addr;
    const license = require.body.license;
    console.log(name, addr, license);
    const sqlInsert = "INSERT INTO Cafe (name, addr, license) VALUES (?,?,?)";
    db.query(sqlInsert, [name, addr, license], (err, result) => {
        console.log(err);
    });
});

app.delete("/api/delete/:name", (require, response) => {
    const cafeName = require.params.name;
    console.log("cafeName is    "+ cafeName);
    const sqlDelete = "DELETE FROM Cafe WHERE name = ?";
    db.query(sqlDelete, cafeName, (err, result) => {
        if (err) 
        console.log(err);
    })
});


app.put("/api/update/", (require, response) => {
    const cafeName = require.body.name;
    const cafeAddr = require.body.addr;
    // const license = require.body.license;
    console.log("cafeName is   "+cafeName);
    console.log("cafeAddr is   "+ cafeAddr);
    
    const sqlUpdate = "UPDATE `Cafe` SET `addr` = ? WHERE `name`= ?";
    db.query(sqlUpdate, [cafeAddr,cafeName ], (err, result) => {
        if (err) 
        console.log(err);
    })
});

app.listen(3002, () =>{
    console.log("running on port 3002")
})