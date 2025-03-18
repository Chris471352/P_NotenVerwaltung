const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// CORS nur von http://localhost:3000 erlauben
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

setTimeout(function(){

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

// Verbindung zur Datenbank herstellen
db.connect(err => {
  if (err) {
    console.error('❌ Fehler bei der Verbindung zur Datenbank:', err.message);
  } else {
    console.log('✅ Verbindung zur Datenbank erfolgreich.');
  }
});

// ---- REST-Endpunkte (GET, POST, PUT, DELETE) ----
app.get("/", (req, res) => {
  const sql = "SELECT * FROM note";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("❌ SQL Fehler:", err.message); // Zeigt den genauen Fehler
      return res.status(500).json({ error: err.message }); // Bessere Fehlerausgabe
    }
    console.log("✅ Datenbankantwort:", data); // Zeigt das Datenbankergebnis
    return res.json(data);
  });
});

app.post('/create', (req, res) => {
  const sql = "INSERT INTO note (Semester, Modulname, Leistungspunkte, Note0, Note1, Note2) VALUES (?)";
  const values = [req.body.Semester, req.body.Modulname, req.body.Leistungspunkte, req.body.Note0, req.body.Note1, req.body.Note2];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("❌ SQL Fehler:", err.message);
      return res.status(500).json({ error: err.message });
    }
    return res.json(data);
  });
});

app.put('/update/:id', (req, res) => {
  const sql = "UPDATE note SET Semester=?, Modulname=?, Leistungspunkte=?, Note0=?, Note1=?, Note2=? WHERE id=?";
  const values = [req.body.Semester, req.body.Modulname, req.body.Leistungspunkte, req.body.Note0, req.body.Note1, req.body.Note2];
  const id = req.params.id;
  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      console.error("❌ SQL Fehler:", err.message);
      return res.status(500).json({ error: err.message });
    }
    return res.json(data);
  });
});

app.delete('/note/:id', (req, res) => {
  const sql = "DELETE FROM note WHERE id=?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("❌ SQL Fehler:", err.message);
      return res.status(500).json({ error: err.message });
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "No record found to delete" });
    }
    return res.json(data);
  });
});

}, 30 * 1000);

app.listen(8081, () => {
  console.log("Backend läuft auf Port 8081...");
});