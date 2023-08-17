import React from 'react';
import './App.css';
import Calendar from './Components/Calendar';

export default function App() {
  return (
      <div
        className="App"
      >
        <header id='main-app-heading'>
          <h1>Nico Dann drums</h1>
        </header>
        <Calendar />
      </div> 

    
  );
}
