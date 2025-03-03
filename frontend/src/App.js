import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Startseite zeigt direkt die Notenverwaltung */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
