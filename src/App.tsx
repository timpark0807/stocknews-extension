import React from 'react';
import './App.css';
import Navbar from "react-bootstrap/Navbar";
import MainPage from "./MainPage";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import { BrowserRouter, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar bg="primary" expand="lg" variant="dark">

          <Route exact path="/index.html">
            <Navbar.Brand>Stock News</Navbar.Brand>
          </Route>

          <Route exact path="/news">
            <Link to="/index.html">
              <Button variant="secondary">Back</Button>
            </Link>
          </Route>

        </Navbar>

        <MainPage/>
      </BrowserRouter>
    </div>
  );
}

export default App;
