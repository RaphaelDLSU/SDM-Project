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
            <a href='/login'> Go to Login Page</a>
            <a href='/register'> Go to Register Page</a>
            <a href='/enrolldash'> Go to Enroll Dashboard</a>
            <a href='/notif'> Go to Notif Page</a>
        </div>
         
            
    )

}