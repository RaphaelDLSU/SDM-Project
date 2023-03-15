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
            
            <a href='/login'> Go to Login Page</a>
            <a href='/register'> Go to Register Page</a>
            <a href='/enrolldash'> Go to Enroll Dashboard</a>
            <a href='/notif'> Go to Notif Page</a>
            <a href ='/schedpage'>Go to Sched Page</a>
            <a href='/adminrec'>Go to Student Records</a>
            <h2> You need to be a student for this</h2>
            <a href='/enrollform'>Go to Enroll Form page</a>


        </div>
         
            
    )

}