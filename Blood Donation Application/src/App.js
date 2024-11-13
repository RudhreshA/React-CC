import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Default route for Login page */}
        <Route path="/login" element={<Login />} />  {/* Default route for Login page */}
        <Route path="/signup" element={<Signup />} /> {/* Route for Signup page */}
        <Route path="/home" element={<Home />} /> {/* Route for Home page */}
      </Routes>
    </Router>
  );
}

export default App;


