import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Note() {

  const [note, setNote] = useState([]);

  // API-Basis-URL aus .env auslesen
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/`)
      .then(res => {
        console.log("API Response:", res.data); // Debugging: Zeigt das empfangene JSON
        setNote(res.data);
      })
      .catch(err => console.log("API Error:", err));
  }, [API_URL]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/note/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid p-0 vh-100">
      {/* Kopfzeile */}
      <div className="bg-dark text-white p-3">
        <h2 className="mb-0">SimpleNoten</h2>
      </div>

      <div className="row g-0 flex-nowrap">
        {/* Sidebar: Flexbox-Spalte (d-flex flex-column), um Inhalt zu strecken */}
        <div className="col-2 d-flex flex-column bg-light border-end p-3" style={{ minWidth: '220px' }}>
          <h5>Semester</h5>
          <button className="btn btn-outline-secondary w-100 text-start mb-2">1. Semester</button>
          <button className="btn btn-outline-secondary w-100 text-start mb-2">2. Semester</button>
          <button className="btn btn-outline-secondary w-100 text-start mb-4">3. Semester</button>

          {/* Mit mt-auto schieben wir diesen Bereich nach unten */}
          <div className="mt-auto">
            <Link to="/create" className="btn btn-success w-100">
              + Note hinzufügen
            </Link>
          </div>
        </div>

        {/* Hauptbereich mit der Tabelle */}
        <div className="col p-3">
          <div className="mb-3">
            {/* Link zum Erstellen einer neuen Note/Modul-Eintrag */}
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
              {note.map((data, i) => (
                <tr key={i}>
                  <td>{data.Semester}</td>
                  <td>{data.Modulname}</td>
                  <td>{data.Leistungspunkte}</td>
                  <td>{data.Note0}</td>
                  <td>{data.Note1}</td>
                  <td>{data.Note2}</td>
                  <td>
                    <Link to={`/update/${data.ID}`} className="btn btn-primary btn-sm me-2">
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
      </div>
    </div>
  );
}

export default Note