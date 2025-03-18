// frontend/src/App.js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Note from './Note';
import CreateNote from './CreateNote';
import UpdateNote from './UpdateNote';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Note />} />
          <Route path='/create' element={<CreateNote />} />
          <Route path='/update/:id' element={<UpdateNote/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
