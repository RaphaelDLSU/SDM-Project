import { useNavigate } from 'react-router-dom'
import React from 'react';
import facebook from '../public/assets/facebook.png'
import instagram from '../public/assets/instagram.png'
import email from '../public/assets/email.png'
import '../public/assets/logo.png'
import '../public/styles/App.css'

export default function FacultyPage() {
    
    const navigate = useNavigate()
    return(

    <div id='contactUsContainer'>   
        < div id='contactUsHeader'> 
        <h1>Contact Us</h1>
            </div>
        <div id='contactUsBody'>
        <div id='contactContainer'>
        <img src= {facebook}></img>
        <p>Facebook</p>
        <a href="https://www.facebook.com/sondemusique.studio/" target="_blank">Visit Our Facebook Page</a>
        </div>
        <div id='contactContainer'>
        <img src= {instagram}></img>
        <p>Instagram:</p>
        <a href="https://www.instagram.com/sondemusique.studio/" target="_blank">Visit Our Instagram Page</a>
        </div>
        <div id='contactContainer'>
        <img src= {email}></img>
        <p>Email us at: sondemusique.studio@gmail.com</p>
        </div>
           
        </div>
    </div> 

    );
    
}