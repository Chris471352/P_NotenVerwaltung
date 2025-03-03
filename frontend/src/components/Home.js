import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddNoteForm from './AddNoteForm';
import UpdateNoteForm from './UpdateNoteForm';

function Home() {
  const [semesterList, setSemesterList] = useState([]);       // Liste aller Semester
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [notes, setNotes] = useState([]);                     // Notenliste (ggf. gefiltert)
  const [showAddForm, setShowAddForm] = useState(false);      // Steuert Anzeige des AddNote-Formulars
  const [editNote, setEditNote] = useState(null);             // Wird gesetzt, wenn wir eine Note bearbeiten

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // 1) Semesterliste vom Server laden
  useEffect(() => {
    axios.get(`${API_URL}/semesters`)
      .then((res) => {
        setSemesterList(res.data); // z.B. [1,2,3,...]
      })
      .catch((err) => console.error(err));
  }, [API_URL]);

  // 2) Noten laden (alle oder nur für ein spezielles Semester)
  useEffect(() => {
    const url = selectedSemester 
      ? `${API_URL}/notes?semester=${selectedSemester}`
      : `${API_URL}/notes`; // wenn kein Semester ausgewählt, lade alle Noten
    axios.get(url)
      .then((res) => {
        setNotes(res.data); 
      })
      .catch((err) => console.error(err));
  }, [API_URL, selectedSemester]);

  // Klick auf eine Semester-Schaltfläche in der Sidebar
  const handleSemesterSelect = (semester) => {
    setSelectedSemester(semester);
  };

  // Neue Note hinzufügen
  const handleAddNote = (newNote) => {
    axios.post(`${API_URL}/notes`, newNote)
      .then(() => {
        setShowAddForm(false);
        // Danach erneut laden
        const url = selectedSemester
          ? `${API_URL}/notes?semester=${selectedSemester}`
          : `${API_URL}/notes`;
        return axios.get(url);
      })
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => console.error(err));
  };

  // Klick auf "Löschen"
  const handleDeleteNote = (noteId) => {
    axios.delete(`${API_URL}/notes/${noteId}`)
      .then(() => {
        // Lokal aus dem State entfernen, um kein komplettes Reload zu machen
        setNotes((prev) => prev.filter((n) => n.ID !== noteId));
      })
      .catch((err) => console.error(err));
  };

  // Klick auf "Bearbeiten" => öffnet das Update-Formular
  const handleEditClick = (note) => {
    setEditNote(note); 
  };

  // Update abschicken
  const handleUpdateNote = (updatedNote) => {
    axios.put(`${API_URL}/notes/${updatedNote.ID}`, updatedNote)
      .then(() => {
        setEditNote(null); // Formular schließen
        // Tabelle neu laden
        const url = selectedSemester
          ? `${API_URL}/notes?semester=${selectedSemester}`
          : `${API_URL}/notes`;
        return axios.get(url);
      })
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <div className="row bg-dark text-white p-2 m-0">
        <div className="col">
          <h2>SimpleNoten</h2>
        </div>
      </div>

      <div className="row m-0" style={{ minHeight: '100vh' }}>
        {/* Sidebar */}
        <div className="col-2 bg-light p-3">
          <h5>Semester</h5>
          <ul className="list-group mb-3">
            {semesterList.map((sem) => (
              <li
                key={sem}
                className={`list-group-item ${
                  sem === selectedSemester ? 'active' : ''
                }`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleSemesterSelect(sem)}
              >
                {sem}. Semester
              </li>
            ))}
          </ul>
          
          {/* Statt "Semester hinzufügen" jetzt "Note einfügen" */}
          <button
            className="btn btn-primary"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            Note einfügen
          </button>

          {/* Formular zum Hinzufügen einer neuen Note (inkl. Semester-Dropdown) */}
          {showAddForm && (
            <AddNoteForm
              semesterList={semesterList}
              onAddNote={handleAddNote}
            />
          )}
        </div>

        {/* Hauptbereich */}
        <div className="col-10 p-3">
          <h3>
            {selectedSemester
              ? `${selectedSemester}. Semester`
              : 'Alle Semester'}
          </h3>

          {/* Tabelle mit Noten */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Modulname</th>
                <th>LP</th>
                <th>Note</th>
                <th>Versuch1</th>
                <th>Versuch2</th>
                <th style={{ width: '120px' }}>Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <tr key={note.ID} className="note-row">
                  <td>{note.Modulname}</td>
                  <td>{note.Leistungspunkte}</td>
                  <td>{note.Note}</td>
                  <td>{note.Versuch1 || '-'}</td>
                  <td>{note.Versuch2 || '-'}</td>
                  <td>
                    {/* Diese Buttons werden per CSS bei :hover sichtbar gemacht */}
                    <div className="note-actions d-inline-block">
                      <button
                        className="btn btn-secondary btn-sm me-2"
                        onClick={() => handleEditClick(note)}
                      >
                        Bearbeiten
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteNote(note.ID)}
                      >
                        Löschen
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Update-Formular (z.B. als Pop-up oder Inline) */}
          {editNote && (
            <UpdateNoteForm
              note={editNote}
              semesterList={semesterList}
              onUpdateNote={handleUpdateNote}
              onClose={() => setEditNote(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
