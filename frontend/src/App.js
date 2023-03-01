


import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import IndexPage from './pages/IndexPage';
import AboutPage from './pages/AboutUs';
import EnrollDashPage from './pages/EnrollDashboard';
import EnrollFormPage from './pages/EnrollForm';
import LoginPage from './pages/LoginPage';
import NotifPage from './pages/NotifPage';
import SchedPage from './pages/SchedulePage';
import SchedSumPage from './pages/ScheduleSummary';
import TeacherPage from './pages/TeacherRecord';
import Layout from './pages/Layout';
import RegisterPage from './pages/RegisterPage';
import AdminRecordPage from './pages/AdminRecord';
import { BrowserRouter, Routes, Route } from "react-router-dom";

{/* ALL ROUTES HAPPEN HERE */}
// Homepage
export default function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="enrolldash" element={<EnrollDashPage />} />
          <Route path="enrollform" element={<EnrollFormPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="notif" element={<NotifPage />} />
          <Route path="schedpage" element={<SchedPage />} />
          <Route path="teacher" element={<TeacherPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="adminrec" element={<AdminRecordPage/>} /> 
        </Route>
      </Routes>
    </BrowserRouter>



  );
}


