// backend/server.js

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());

// CORS nur von http://localhost:3000 erlauben
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ---- NEU: Environment-Variablen mit Default-Werten ----
const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'test'
} = process.env;

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});

// ---- REST-Endpunkte (GET, POST, PUT, DELETE) bleiben gleich ----
app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.post('/create', (req, res) => {
  const sql = "INSERT INTO student (Name, Email) VALUES (?)";
  const values = [req.body.name, req.body.email];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.put('/update/:id', (req, res) => {
  const sql = "UPDATE student SET Name=?, Email=? WHERE id=?";
  const values = [req.body.name, req.body.email];
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
  console.log("Backend läuft auf Port 8081...");
});
