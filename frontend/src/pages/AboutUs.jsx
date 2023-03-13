import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';
import '../public/styles/App.css'

export default function AboutPage() {



    
    return(
        <div id='aboutUsHeader'>
            <h1>
            About Son De Musique
            </h1>
            <br></br>
            <div className='aboutUs-mission'>
                <p>Mission</p>
            </div>
            <div className='about-block'>
                <p>input mission statement here</p>
            </div>
            <div className='aboutUs-mission'>
                <p>Vision</p>
            </div>
            <div className='about-block'>
                <p>input vision statement here</p>
            </div>
        </div>
            
            
    )

}