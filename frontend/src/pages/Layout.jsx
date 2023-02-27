import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState} from 'react';
import axios from 'axios';
import '../public/styles/App.css';
import {Outlet,Link} from 'react-router-dom';

export default function Layout() {

    return(

        <div className='App'>
            <Navbar/>
            
                <Outlet/>

            
             {/*OUTLET RENDERS "/" INDEX PAGE FROM APP.JS (Route Path from App.js*/}
 
            
        </div>
        
         
            
    )

}