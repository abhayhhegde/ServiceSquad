import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/ui/Toast';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ServicesPage from './components/ServicePage';
import Become from './components/Become';
import ServiceProviderList from './components/services/ServiceProviderList';
import ProtectedRoute from './utils/ProtectedRoute';
import Dashboard from './components/dashboard/Dashboard';
import BookingForm from './components/dashboard/BookingForm';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/servicepage" element={<ServicesPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contactus" element={<Contact />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/become" element={<Become />} />
                <Route path="/services/:service" element={<ServiceProviderList />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/booking/:providerId/:serviceType" element={<BookingForm />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
