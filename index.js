const express = require('express');
const db = require('./db'); // unsere Datenbankverbindung
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware, um JSON im Request-Body zu parsen
app.use(express.json());

// 1) CREATE / POST – Neue Note hinzufügen
app.post('/noten', (req, res) => {
  const { fach, note } = req.body;

  if (!fach || note == null) {
    return res.status(400).json({ message: 'Bitte Fach und Note angeben.' });
  }

  const sql = 'INSERT INTO noten (fach, note) VALUES (?, ?)';
  db.run(sql, [fach, note], function (err) {
    if (err) {
      console.error('Fehler beim Einfügen:', err.message);
      return res.status(500).json({ error: err.message });
    }
    // 'this.lastID' enthält die automatisch vergebene ID.
    return res.status(201).json({
      id: this.lastID,
      fach,
      note
    });
  });
});

// 2) READ / GET – Alle Noten abrufen
app.get('/noten', (req, res) => {
  const sql = 'SELECT * FROM noten';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Fehler beim Auslesen aller Noten:', err.message);
      return res.status(500).json({ error: err.message });
    }
    return res.json(rows);
  });
});

// 3) READ / GET – Einzelne Note nach ID abrufen
app.get('/noten/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM noten WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('Fehler beim Auslesen einer Note:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: `Keine Note mit ID ${id} gefunden.` });
    }
    return res.json(row);
  });
});

// 4) UPDATE / PUT – Note aktualisieren
app.put('/noten/:id', (req, res) => {
  const { id } = req.params;
  const { fach, note } = req.body;

  // Erst prüfen, ob Datensatz existiert
  const selectSql = 'SELECT * FROM noten WHERE id = ?';
  db.get(selectSql, [id], (err, row) => {
    if (err) {
      console.error('Fehler beim Auslesen der vorhandenen Note:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: `Keine Note mit ID ${id} gefunden.` });
    }

    // Falls vorhanden, Update durchführen (nur Felder, die mitgegeben wurden)
    const newFach = fach ?? row.fach;
    const newNote = (note != null) ? note : row.note;

    const updateSql = 'UPDATE noten SET fach = ?, note = ? WHERE id = ?';
    db.run(updateSql, [newFach, newNote, id], function (err2) {
      if (err2) {
        console.error('Fehler beim Aktualisieren:', err2.message);
        return res.status(500).json({ error: err2.message });
      }
      // Aktualisierten Datensatz zurückgeben
      return res.json({
        id: parseInt(id, 10),
        fach: newFach,
        note: newNote
      });
    });
  });
});

// 5) DELETE / DELETE – Note löschen
app.delete('/noten/:id', (req, res) => {
  const { id } = req.params;

  // Prüfen, ob Datensatz existiert
  const selectSql = 'SELECT * FROM noten WHERE id = ?';
  db.get(selectSql, [id], (err, row) => {
    if (err) {
      console.error('Fehler beim Auslesen einer Note:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: `Keine Note mit ID ${id} gefunden.` });
    }

    // Falls vorhanden, Löschen durchführen
    const deleteSql = 'DELETE FROM noten WHERE id = ?';
    db.run(deleteSql, id, function (err2) {
      if (err2) {
        console.error('Fehler beim Löschen:', err2.message);
        return res.status(500).json({ error: err2.message });
      }
      return res.json({
        message: `Note mit ID ${id} wurde gelöscht.`,
        deleted: row
      });
    });
  });
});

// Server starten
app.listen(PORT, () => {
  console.log(`Noten-Microservice mit SQLite läuft auf Port ${PORT}`);
});
