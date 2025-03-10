// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ServicesPage from './components/ServicePage';
import Become from './components/Become';
import Electrician from './components/services/Electrician';
import Carpenter from './components/services/Carpenter';
import Plumber from './components/services/Plumber';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path='/servicepage' element={<ServicesPage/>} />
          <Route path='/become' element={<Become/>} />
          <Route path='/electrician' element={<Electrician/>}/>
          <Route path='/carpenter' element={<Carpenter/>}/>
          <Route path='/plumber' element={<Plumber/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
