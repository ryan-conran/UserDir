import React from 'react';
import logo from './logo.svg';
import './App.css';
import EmployeesDirectory from './components/EmployeeDirectory';

function App() {
  return (
    <div className="App">
      <h1>Employees Directory</h1>
      <div>
        <EmployeesDirectory />        
      </div>
    </div>
  );
}

export default App;
