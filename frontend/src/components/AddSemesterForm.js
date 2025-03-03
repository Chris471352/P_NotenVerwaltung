import React, { useState } from 'react';

function AddSemesterForm({ onAddSemester }) {
  const [semester, setSemester] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aufrufer-Komponente führt dann den eigentlichen POST aus
    onAddSemester(semester);
    setSemester('');
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 mt-2">
      <h5>Neues Semester hinzufügen</h5>
      <div className="mb-2">
        <label>Semester</label>
        <input
          type="number"
          className="form-control"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Hinzufügen
      </button>
    </form>
  );
}

export default AddSemesterForm;
