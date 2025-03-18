import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Note(){

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
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
          <div className='w-75 bg-white rounded p-3'>
            <Link to="/create" className='btn btn-success mb-2'>Add +</Link>
            <table className='table'>
              <thead>
                <tr>
                  <th>Semester</th>
                  <th>Modulname</th>
                  <th>Leistungspunkte</th>
                  <th>Note0</th>
                  <th>Note1</th>
                  <th>Note2</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {note.map((data,i) => (
                  <tr key={i}>
                    <td>{data.Semester}</td>
                    <td>{data.Modulname}</td>
                    <td>{data.Leistungspunkte}</td>
                    <td>{data.Note0}</td>
                    <td>{data.Note1}</td>
                    <td>{data.Note2}</td>
                    <td>
                      <Link to={`/update/${data.ID}`} className='btn btn-primary'>Update</Link>
                      <button
                        className='btn btn-danger ms-2'
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
      );
    }

export default Note