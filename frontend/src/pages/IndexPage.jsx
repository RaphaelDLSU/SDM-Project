import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState} from 'react';
import axios from 'axios';

export default function IndexPage() {

    return(

        <div>
            <Navbar/>
            <Sidebar/>
            <form action="../../student/post" method="post" 
              className="form">
          <button type="submit">Connected?</button>
        </form>
                

        </div>
         
            
    )

}