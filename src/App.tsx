import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "react-bootstrap/Navbar";
import MainPage from "./MainPage";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Navbar bg="primary" expand="lg" variant="dark">
        <Navbar.Brand>Stock News</Navbar.Brand>
      </Navbar>
      <MainPage/>
    </div>
  );
}

export default App;
