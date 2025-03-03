import React, { useState } from 'react';

function AddNoteForm({ semesterList, onAddNote }) {
  const [semester, setSemester] = useState('');  // Semester aus Drop-down
  const [modulname, setModulname] = useState('');
  const [leistungspunkte, setLeistungspunkte] = useState('');
  const [note, setNote] = useState('');
  const [versuch1, setVersuch1] = useState('');
  const [versuch2, setVersuch2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!semester) {
      alert('Bitte ein Semester auswählen!');
      return;
    }
    const newNote = {
      Semester: parseInt(semester),
      Modulname: modulname,
      Leistungspunkte: Number(leistungspunkte),
      Note: Number(note),
      Versuch1: versuch1 ? Number(versuch1) : null,
      Versuch2: versuch2 ? Number(versuch2) : null
    };
    onAddNote(newNote);
    // Optional: Felder zurücksetzen
    setSemester('');
    setModulname('');
    setLeistungspunkte('');
    setNote('');
    setVersuch1('');
    setVersuch2('');
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 mt-2">
      <h5>Note hinzufügen</h5>
      
      {/* Semester-Auswahl per Drop-down */}
      <div className="mb-2">
        <label>Semester</label>
        <select
          className="form-control"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="">-- Bitte wählen --</option>
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
        <label>Leistungspunkte (LP)</label>
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
          value={note}
          onChange={(e) => setNote(e.target.value)}
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

      <button type="submit" className="btn btn-primary">Hinzufügen</button>
    </form>
  );
}

export default AddNoteForm;
