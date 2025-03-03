import React, { useState, useEffect } from 'react';

function UpdateNoteForm({ note, semesterList, onUpdateNote, onClose }) {
  const [semester, setSemester] = useState(note.Semester);
  const [modulname, setModulname] = useState(note.Modulname);
  const [leistungspunkte, setLeistungspunkte] = useState(note.Leistungspunkte);
  const [aktNote, setAktNote] = useState(note.Note);
  const [versuch1, setVersuch1] = useState(note.Versuch1 || '');
  const [versuch2, setVersuch2] = useState(note.Versuch2 || '');

  useEffect(() => {
    // Bei erneutem Öffnen (wenn note-Prop sich ändert) Felder aktualisieren
    setSemester(note.Semester);
    setModulname(note.Modulname);
    setLeistungspunkte(note.Leistungspunkte);
    setAktNote(note.Note);
    setVersuch1(note.Versuch1 || '');
    setVersuch2(note.Versuch2 || '');
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedNote = {
      ID: note.ID,  // Wichtig für PUT /notes/:id
      Semester: parseInt(semester),
      Modulname: modulname,
      Leistungspunkte: Number(leistungspunkte),
      Note: Number(aktNote),
      Versuch1: versuch1 ? Number(versuch1) : null,
      Versuch2: versuch2 ? Number(versuch2) : null,
    };
    onUpdateNote(updatedNote);
  };

  return (
    <div className="border p-3 mb-3">
      <h5>Note bearbeiten (ID: {note.ID})</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Semester</label>
          <select
            className="form-control"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            {semesterList.map((s) => (
              <option key={s} value={s}>
                {s}. Semester
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label>Modulname</label>
          <input
            type="text"
            className="form-control"
            value={modulname}
            onChange={(e) => setModulname(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label>Leistungspunkte</label>
          <input
            type="number"
            className="form-control"
            value={leistungspunkte}
            onChange={(e) => setLeistungspunkte(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label>Note</label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            value={aktNote}
            onChange={(e) => setAktNote(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label>Versuch 1</label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            value={versuch1}
            onChange={(e) => setVersuch1(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label>Versuch 2</label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            value={versuch2}
            onChange={(e) => setVersuch2(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-success me-2">
          Speichern
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Abbrechen
        </button>
      </form>
    </div>
  );
}

export default UpdateNoteForm;
