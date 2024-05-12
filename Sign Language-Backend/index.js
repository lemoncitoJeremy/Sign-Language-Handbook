const port = 5000;

/* Express */
const express = require('express');

const app = express();


/* Cors */
const cors = require("cors");
app.use(cors());

/* Mysql */
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"signlang"
});
  

/* Basic Data */
app.use('/', (req, res) => {
    res.send("TokenTest");
});

app.listen(port, () => {
    console.log('Now Listening: ' + port );
});