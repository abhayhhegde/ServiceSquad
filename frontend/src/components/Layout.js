import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import './Layout.css';

const Layout = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <div className="layout">
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <main className="content">
        <Outlet /> 
      </main>
      <Footer isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default Layout;
