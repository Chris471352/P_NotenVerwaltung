const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
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

app.post('/create', (req, res) => {
    const sql = "INSERT INTO student (`Name`, `Vorname`, `Email`) VALUES (?)";
    const values = [
      req.body.name,
      req.body.vorname,    // <-- neuer Wert für Vorname
      req.body.email
    ];
  
    db.query(sql, [values], (err, data) => {
      if (err) return res.json("Error");
      return res.json(data);
    });
  });
  
  app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student SET Name=?, Vorname=?, Email=? WHERE ID=?";
    const values = [
      req.body.name,
      req.body.vorname,    // <-- neuer Wert für Vorname
      req.body.email
    ];
    const id = req.params.id;
  
    db.query(sql, [...values, id], (err, data) => {
      if (err) return res.json("Error");
      return res.json(data);
    });
  });
  

app.delete('/student/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE id=?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        if (data.affectedRows === 0) return res.json("No record found to delete");
        return res.json(data);
    });
});


app.listen(8081, () => {
    console.log("listening");
})