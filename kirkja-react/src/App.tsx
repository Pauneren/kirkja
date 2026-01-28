import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/Homepage';
import Kirkjan from './components/Kirkjan';
import Olafskirkja from './components/Olafskirkja';
import Ingjalsholskirkja from './components/Ingjalsholskirkja';
import Contact from './components/Contact';
import Frettir from './components/Frettir';
import Helgihald from './components/Helgihald';
import Fermingar from './components/Fermingar';
import Admin from './components/Admin';
import './App.css';

function App() {
  return (
    <Router basename="/kirkja">
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/kirkjan" element={<Kirkjan />} />
          <Route path="/helgihald" element={<Helgihald />} />
          <Route path="/fermingar" element={<Fermingar />} />
          <Route path="/frettir" element={<Frettir />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/olafskirkja" element={<Olafskirkja />} />
          <Route path="/ingjalsholskirkja" element={<Ingjalsholskirkja />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <footer>
          <p>© 2026 Olafskirkja og Ingjalsholskirkja</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
