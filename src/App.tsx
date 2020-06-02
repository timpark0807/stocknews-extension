import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "react-bootstrap/Navbar";
import MainPage from "./MainPage";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar bg="primary" expand="lg" variant="dark">
          <Navbar.Brand>Stock News</Navbar.Brand>
        </Navbar>
        <MainPage/>
      </BrowserRouter>
    </div>
  );
}

export default App;
