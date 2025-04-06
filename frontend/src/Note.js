import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Note() {
  const [note, setNote] = useState([]);
  // Speichert das aktuell ausgewählte Semester oder null (keine Filterung)
  const [selectedSemester, setSelectedSemester] = useState(null);
  
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/`)
      .then((res) => setNote(res.data))
      .catch((err) => console.log("API Error:", err));
  }, [API_URL]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/note/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // Alle in der Datenbank vorhandenen Semester ermitteln:
  // Map auf 'Semester', dann Set für eindeutige Werte, dann Array draus machen.
  const uniqueSemesters = [...new Set(note.map((item) => item.Semester))].sort();

  // Klick auf Semester-Button => wenn das Semester bereits ausgewählt war, Filter aufheben,
  // sonst das geklickte Semester auswählen.
  const handleSemesterClick = (semester) => {
    if (selectedSemester === semester) {
      setSelectedSemester(null);
    } else {
      setSelectedSemester(semester);
    }
  };

  // Gefilterte Noten, je nach selectedSemester (null = alle)
  const filteredNotes = selectedSemester
    ? note.filter((n) => n.Semester === selectedSemester)
    : note;

  return (
    <>
      {/* Obere Leiste (fixiert) */}
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

      {/* Linke Sidebar (fixiert), Button am unteren Rand */}
      <div
        className="bg-light border-end p-3"
        style={{
          position: "fixed",
          top: "72px",   // unterhalb der Kopfzeile
          left: 0,
          bottom: 0,
          width: "220px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Der obere Teil ist scrollbar */}
        <div style={{ flex: "1 1 auto", overflowY: "auto" }}>
          <h5>Semester</h5>

          {/* Dynamische Semester-Buttons */}
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

        {/* Der untere Teil bleibt fix am Boden der Sidebar */}
        <div>
          <Link to="/create" className="btn btn-success w-100">
            + Note hinzufügen
          </Link>
        </div>
      </div>

      {/* Hauptinhalt: wird nach rechts/unten verschoben */}
      <div
        style={{
          marginTop: "72px",   // Platz für die Kopfzeile
          marginLeft: "220px", // Platz für die Sidebar
          padding: "1rem"
        }}
      >
        <div className="mb-3">
          <Link to="/create" className="btn btn-success">+ Modul</Link>
        </div>

        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Semester</th>
              <th>Modulname</th>
              <th>Leistungspunkte</th>
              <th>Note</th>
              <th>Versuch 1</th>
              <th>Versuch 2</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotes.map((data, i) => (
              <tr key={i}>
                <td>{data.Semester}</td>
                <td>{data.Modulname}</td>
                <td>{data.Leistungspunkte}</td>
                <td>{data.Note0}</td>
                <td>{data.Note1}</td>
                <td>{data.Note2}</td>
                <td>
                  <Link
                    to={`/update/${data.ID}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(data.ID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Note;
