import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState} from 'react';
import axios from 'axios';

export default function IndexPage() {

    return(

        <div>
            <Navbar/> {/* From Components Folder*/}
            <Sidebar/>
            <form action="../../student/post" method="post" className="form">
                <button type="submit">Connected?</button> {/* Sends a console.log in backend to verify if connected to React*/}
            </form>
                

        </div>
         
            
    )

}