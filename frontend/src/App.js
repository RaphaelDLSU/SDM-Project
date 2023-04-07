

import React, { useState, useEffect } from 'react';


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
import StudentRecordDetailsPage from './pages/StudentRecordDetails';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentPage from './pages/PaymentPage';
import AdminCalendar from './pages/AdminCalendar';
import PayrollPage from './pages/Payroll'
import StudentRecord from './pages/StudentRecord';
import EnrollPending from './pages/EnrollPending';
import FreeTrialPending from './pages/FreeTrialPending';
import FreeEnrollForm from'./pages/FreeEnrollForm'
import TeacherSchedule from './pages/TeacherSchedule';
import SchedCreatePage from './pages/ScheduleCreate';
import FacultyPage from './pages/Faculty';


{/* ALL ROUTES HAPPEN HERE */}
// Homepage
export default function App() {
  return (
    <BrowserRouter> {/* ALL ROUTES HERE */}
      <Routes>
        <Route path="/" element={<Layout />}> {/* Path = link Element = jsx*/}
          <Route index element={<IndexPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="enrolldash" element={<EnrollDashPage />} />
          <Route path="enrollform" element={<EnrollFormPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="notif" element={<NotifPage />} />
          <Route path="schedpage" element={<SchedPage />} />
          <Route path="schedsummary" element={<SchedSumPage />} />
          <Route path="teacher" element={<TeacherPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="studentrecdetails" element={<StudentRecordDetailsPage/>} /> 
          <Route path="payment" element={<PaymentPage/>} /> 
          <Route path="calendar" element={<AdminCalendar/>} /> 
          <Route path="payroll" element={<PayrollPage/>} /> 
          <Route path="studentRecord" element={<StudentRecord/>} /> 
          <Route path="enrollpending" element={<EnrollPending/>} /> 
          <Route path="enrollfree" element={<FreeEnrollForm />} />
          <Route path="facultypage" element={<FacultyPage/>}/>
          <Route path="freetrialpending" element={<FreeTrialPending />} />
          <Route path = "AdminCalendar" element = {<AdminCalendar/>}/>
          <Route path = "teacherschedule" element = {<TeacherSchedule/>}/>
          <Route path = "schedulecreate" element = {<SchedCreatePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


