import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState} from 'react';
import axios from 'axios';
import '../public/styles/index.css'

export default function IndexPage() {

    return(

        <div className='body'>
            <h1>YOU ARE IN INDEX PAGE</h1>
            <form action="../../student/post" method="post" className="form">
                <button type="submit">Connected?</button> {/* Sends a console.log in backend to verify if connected to React*/}
            </form>
            <a href='/login'> Go to Login Page</a><br></br>
            <a href='/register'> Go to Register Page</a><br></br>
            <a href='/enrolldash'> Go to Enroll Dashboard</a><br></br>
            <a href='/notif'> Go to Notif Page</a><br></br>
            <a href ='/schedpage'>Go to Sched Page</a><br></br>
            <a href='/adminrec'>Go to Student Records</a><br></br>
            <a href='/teacher'>Go to Teacher Records</a><br></br>
            <a href='/payroll'>Go to Payroll</a><br></br>
            <a href='/studentRecord'>Go to Student Records</a><br></br>
            <a href='/enrollpending'>Go to Pending Enrollments</a><br></br>
        </div>
         
            
    )

}