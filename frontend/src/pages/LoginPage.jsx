import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import Logo from '../public/assets/logo.png';
import reactLogo from '../public/assets/logo512.png';
import '../public/styles/App.css';
import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

export default function LoginPage() {

   
    return(
        <div className='box'>
            <div className='box-content'>
                <form method='POST'>
                <img className='company-title' src = {Logo} alt={reactLogo} ></img> 
                <p>Email</p><input type='text'  ></input>
                <p>Password</p> <input type='text'  ></input>
                <p>No account?<a href='/register'>Enroll now!</a></p>
                <input type='submit' value='Login'></input>
                </form>
            </div>
        </div>
       
    )

}