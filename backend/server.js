const express = require("express");
const cors =require("cors");
const mysql = require("mysql");
const app = express();

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
})

// filepath: /e:/GIT/P_NotenVerwaltung/backend/server.js
app.get("/", (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});


app.listen(8081, () => {
    console.log("listening");
})