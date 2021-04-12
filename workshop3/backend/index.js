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
        database: 'pt1team25'
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
    const sqlSelect = "SELECT * FROM User";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

app.get('/api/search_user_id', (require, response) => {
    const user_id = require.query.user_id;
    console.log("backend search userId is: "+ user_id);


    const sqlSelect = "SELECT * FROM User WHERE User.user_id = ?";
    db.query(sqlSelect, [user_id], (err, result) => {
        console.log(result);
        console.log(err);
        response.send(result);
    });
});



app.get('/api/advanced_query', (require, response) => {
    // const user_id = require.query.user_id;
    console.log("backend advanced_query ");


    const sqlSelect = 'SELECT user_id, product_name, MIN(product_price) as product_p ' +
    'FROM (SELECT * FROM User NATURAL JOIN Contains NATURAL JOIN Product) as newTable ' + 
    'GROUP BY user_id, product_name ' +
    'ORDER BY user_id '+
    'LIMIT 15;';

    db.query(sqlSelect, (err, result) => {
        console.log(result);
        console.log(err);
        response.send(result);
    });
});


app.post('/api/insert', (require, response) => {
    const userId = require.body.user_id;
    const username = require.body.username;
    const password = require.body.password;
    const phoneNumber = require.body.phone_num;
    const email = require.body.email;

    
    console.log(username, password, phoneNumber, email);
    const sqlInsert = "INSERT INTO User (user_id, username, password, phone_num, email) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [userId,username, password, phoneNumber,email], (err, result) => {
        console.log(err);
    });
});

app.delete("/api/delete/:user_id", (require, response) => {
    const userId = require.params.user_id;
    console.log("userId is    "+ userId);
    const sqlDelete = "DELETE FROM User WHERE user_id = ?";
    db.query(sqlDelete, userId, (err, result) => {
        if (err) 
        console.log(err);
    })
});


app.put("/api/update/", (require, response) => {
    const user_id = require.body.user_id;
    const newpassword = require.body.password;
    // const license = require.body.license;
    console.log("user_id is   "+ user_id);
    console.log("newpassword is   "+ newpassword);
    
    const sqlUpdate = "UPDATE `User` SET `password` = ? WHERE `user_id`= ?";
    db.query(sqlUpdate, [newpassword,user_id ], (err, result) => {
        if (err) 
        console.log(err);
    })
});

app.listen(3002, () =>{
    console.log("running on port 3002")
})