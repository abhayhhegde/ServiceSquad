// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ServicesPage from './components/ServicePage';
import Become from './components/Become';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path='/servicepage' element={<ServicesPage/>} />
        <Route path='/become' element={<Become/>} />
      </Routes>
    </Router>
  );
}

export default App;
