// src/App.tsx
import React from 'react';
import PatientForm from './components/PatientForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Registro de Pacientes</h1>
      </header>
      <main>
        <PatientForm />
      </main>
    </div>
  );
}

export default App;
