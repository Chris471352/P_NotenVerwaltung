import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateNote() {
  const [semester, setSemester] = useState('');
  const [modulname, setModulname] = useState('');
  const [leistungspunkte, setLeistungspunkte] = useState('');
  const [note0, setNote0] = useState('');
  const [note1, setNote1] = useState('');
  const [note2, setNote2] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  function handleSubmit(event) {
    event.preventDefault();
    axios.post(`${API_URL}/create`, { semester, modulname, leistungspunkte,
        note0, note1, note2
      })
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Add Semester</h2>
          <div className='mb-2'>
            <label>Semester</label>
            <input
              type='number'
              placeholder='Geben Sie das Semester ein'
              className='form-control'
              onChange={e => setSemester(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label>Modulname</label>
            <input
              type='text'
              placeholder='Geben Sie den Modulnamen ein'
              className='form-control'
              onChange={e => setModulname(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label>Leistungspunkte</label>
            <input
              type='number'
              placeholder='Geben Sie die Leistungspunkte ein'
              className='form-control'
              onChange={e => setLeistungspunkte(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label>Note</label>
            <input
              type='number'
              placeholder='Geben Sie Ihre Note ein'
              className='form-control'
              onChange={e => setNote0(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label>2. Versuch</label>
            <input
              type='number'
              placeholder='Geben Sie Ihren 2. Versuch ein (optional)'
              className='form-control'
              onChange={e => setNote1(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label>3. Versuch</label>
            <input
              type='number'
              placeholder='Geben Sie Ihren 3. Versuch ein (optional)'
              className='form-control'
              onChange={e => setNote2(e.target.value)}
            />
          </div>
          
          <button className='btn btn-success'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateNote;