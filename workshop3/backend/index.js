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

app.get('/', (require, response) => {
    const sqlselect = "SELECT * FROM Cafe"
    db.query(sqlselect, (err, result) => {
        response.send(result);
    })
})

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

app.listen(3002, () =>{
    console.log("running on port 3002")
})