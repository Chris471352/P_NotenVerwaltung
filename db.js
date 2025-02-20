const sqlite3 = require('sqlite3').verbose();

// Öffne/Erstelle eine SQLite-Datenbank-Datei namens 'noten.db'
const db = new sqlite3.Database('noten.db', (err) => {
  if (err) {
    console.error('Fehler beim Öffnen der Datenbank:', err.message);
  } else {
    console.log('Verbindung zur SQLite-Datenbank hergestellt.');
  }
});

// Erstelle Tabelle 'noten', falls sie noch nicht existiert
db.run(`
  CREATE TABLE IF NOT EXISTS noten (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fach TEXT NOT NULL,
    note INTEGER NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Fehler beim Erstellen der Tabelle:', err.message);
  } else {
    console.log('Tabelle "noten" ist bereit.');
  }
});

module.exports = db;
