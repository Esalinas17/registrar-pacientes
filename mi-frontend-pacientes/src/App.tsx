// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Sistema de Gestión de Pacientes</h1>
          <nav className="App-nav">
            <ul>
              <li>
                <Link to="/registrar">Registrar Paciente</Link>
              </li>
              <li>
                <Link to="/pacientes">Ver Pacientes</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/registrar" element={<PatientForm />} />
            <Route path="/pacientes" element={<PatientList />} />
            {/* Ruta por defecto, puede ser una bienvenida o redirigir */}
            <Route path="/" element={
              <div className="welcome-message">
                <h2>Bienvenido al Sistema</h2>
                <p>Seleccione una opción del menú para comenzar.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
