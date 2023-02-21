
import './App.css';

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {Route,Routes} from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
// Homepage
export default function App() {
  return (
    <div className='App'>
      <IndexPage/>
    </div>
    



  );
}


