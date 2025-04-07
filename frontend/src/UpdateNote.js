import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UpdateNote() {
  const [semester, setSemester] = useState('');
  const [modulname, setModulname] = useState('');
  const [leistungspunkte, setLeistungspunkte] = useState('');
  const [note0, setNote0] = useState('');
  const [note1, setNote1] = useState('');
  const [note2, setNote2] = useState('');

  const [allNotes, setAllNotes] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  // Für die Sidebar: aktuelle Noten laden
  useEffect(() => {
    axios
      .get(`${API_URL}/`)
      .then((res) => setAllNotes(res.data))
      .catch((err) => console.log("API Error:", err));
  }, [API_URL]);


  const uniqueSemesters = [...new Set(allNotes.map((item) => item.Semester))].sort();

  const handleSemesterClick = (sem) => {
    if (selectedSemester === sem) {
      setSelectedSemester(null);
    } else {
      setSelectedSemester(sem);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put(`${API_URL}/update/${id}`, {
        semester,
        modulname,
        leistungspunkte,
        note0,
        note1,
        note2
      })
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {/* Top-Bar */}
      <div
        className="bg-dark text-white p-3"
        style={{
          height: "72px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0
        }}
      >
        <h2 className="mb-0">SimpleNoten</h2>
      </div>

      {/* Linke Sidebar */}
      <div
        className="bg-light border-end p-3"
        style={{
          position: "fixed",
          top: "72px",
          left: 0,
          bottom: 0,
          width: "220px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div style={{ flex: "1 1 auto", overflowY: "auto" }}>
          <h5>Semester</h5>
          {uniqueSemesters.map((sem) => (
            <button
              key={sem}
              className={`btn w-100 text-start mb-2 ${
                selectedSemester === sem ? "btn-secondary" : "btn-outline-secondary"
              }`}
              onClick={() => handleSemesterClick(sem)}
            >
              {sem}. Semester
            </button>
          ))}
        </div>

        <div>
          <Link to="/" className="btn btn-success w-100">
            Zurück zur Übersicht
          </Link>
        </div>
      </div>

      {/* Hauptinhalt: Formular */}
      <div
        style={{
          marginTop: "72px",   // Platz für die Kopfzeile
          marginLeft: "220px", // Platz für die Sidebar
          padding: "1rem"
        }}
      >
        <div className="bg-white rounded p-3" style={{ maxWidth: "600px" }}>
          <h2>Modul bearbeiten</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label>Semester</label>
              <input
                type="number"
                className="form-control"
                placeholder="Semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label>Modulname</label>
              <input
                type="text"
                className="form-control"
                placeholder="Modulname"
                value={modulname}
                onChange={(e) => setModulname(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label>Leistungspunkte</label>
              <input
                type="number"
                className="form-control"
                placeholder="Leistungspunkte"
                value={leistungspunkte}
                onChange={(e) => setLeistungspunkte(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label>Note</label>
              <input
                type="number"
                className="form-control"
                placeholder="Note"
                value={note0}
                onChange={(e) => setNote0(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label>2. Versuch (optional)</label>
              <input
                type="number"
                className="form-control"
                placeholder="2. Versuch"
                value={note1}
                onChange={(e) => setNote1(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label>3. Versuch (optional)</label>
              <input
                type="number"
                className="form-control"
                placeholder="3. Versuch"
                value={note2}
                onChange={(e) => setNote2(e.target.value)}
              />
            </div>
            <button className="btn btn-success">Aktualisieren</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateNote;
