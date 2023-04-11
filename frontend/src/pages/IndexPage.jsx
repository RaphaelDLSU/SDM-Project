import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import '../public/styles/index.css'
import {decodeToken} from 'react-jwt'
import { useNavigate } from 'react-router-dom'

export default function IndexPage() {
    const history=useNavigate()

    useEffect(()=>{
        
        const token = localStorage.getItem('token')
        console.log(token)
        if (token ==null) {
			localStorage.removeItem('token')
            alert('You cannot browse this. Going back to login...')
			history('/login')
		}
        else  {
            const user = decodeToken(token)
            console.log(user)
			console.log('User is registered. Given Access')
		}// Authentication
		
        
    },[])

    return(


        <div className='body'>
            <h1>YOU ARE IN INDEX PAGE</h1>
            <form action="../../student/post" method="post" className="form">
                <button type="submit">Connected?</button> {/* Sends a console.log in backend to verify if connected to React*/}
            </form>

            <h2>NONE USER</h2>
            <a href='/register'> Go to Register Page</a><br></br>
            <a href='/login'> Go to Login Page</a><br></br>
            <a href='/enrollfree'>Go to Free Enroll Form</a><br></br>
            <a href='/facultypage'>Go to Faculty Page</a><br></br>

            <h2>STUDENT</h2>
            <a href='/enrollform'>Go to Enroll Form page</a><br></br>
            <a href='/studentenrollments'> Go to Student's enrollments</a><br></br>
            <a href='/enrolldash'> Go to Enroll Dashboard</a><br></br>
            <a href='/payment'> Go to Payment Page</a><br></br>
            <a href ='/schedpage'>Go to Sched Page</a><br></br>
            <a href='/schedsummary'>Go to Schedule Summary</a><br></br>

            

            <h2> ADMIN</h2>
            <a href='/studentRecord'>Go to Student Records</a><br></br>
            <a href='/enrolldash'> Go to Enroll Dashboard</a>
            <a href='/teacher'>Go to Teacher Records</a><br></br>
            <a href='/payroll'>Go to Payroll</a><br></br>
            <a href='/enrollpending'>Go to Pending Enrollments</a><br></br>
            <a href='/freetrialpending'>Go to Free Trial Requests</a><br></br>
            <a href='/facultymanage'>Go to Faculty Manage Page</a><br></br>

            
            <a href='/notif'> Go to Notif Page</a><br></br>
            <a href='/adminrec'>Go to Student Records</a><br></br>
            
        
            <h2> TEACHER</h2>
            <a href='/teacherschedule'>Go to Teacher Schedule page</a><br></br>
            <a href='/mystudents'>Go to Teacher's Students page</a><br></br>

            <h2> Calendar</h2>
            <a href='/AdminCalendar'>Go to Calendar</a><br></br>
            <a href='/facultymembers'>Go to Faculty Members</a>
        </div>
         
            
    )

}