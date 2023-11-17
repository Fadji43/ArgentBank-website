import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Signin from './pages/Signin'
import User from './pages/User';
import './css/main.css'

function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/signin" element={<Signin></Signin>} />
            <Route path="/user" element={<User></User>} />
          </Routes>
        </BrowserRouter>
      </div>
    
  );
}

export default App;
