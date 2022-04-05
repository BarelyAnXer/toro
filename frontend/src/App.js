import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { Button } from '@mui/material';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>HEADER</header>
        <div>
          <Button variant="contained"><Link to="/">Home</Link></Button>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
