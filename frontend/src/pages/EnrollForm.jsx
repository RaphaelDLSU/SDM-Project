import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState} from 'react';
import axios from 'axios';
import '../public/styles/App.css'

export default function EnrollFormPage() {

    return(

        <div className='with-sidebar'>
            <Sidebar/>
                <div className ="form">
                    <div className='fields'>
                        <h1>Personal Details</h1>
                            <div className='personal'>
                                <div className='field'>
                                    <p>First Name</p><input type='text'></input>
                                </div>
                                <div className='field'>
                                    <p>Last Name</p><input type='text'></input>
                                </div>
                                <br></br>
                                <div className='field'>
                                    <p>Age</p><input type='text'></input>
                                </div>
                                
                                <div className='field'>
                                    <p>Country or Residence</p><input type='text'></input>
                                </div>
                                <br></br>
                                <div className='field'>
                                    <p>Gender</p><input type='text'></input>
                                </div>
                                
                                <div className='field'>
                                    <p>Level</p><input type='text'></input>
                                </div>
                            </div>
                            
                            <h1>Select Program</h1>
                            <div className='program'>

                                <div className='field'>
                                <p>How Many Programs?</p><input type='text'></input>

                                </div>
                                <div className='field'>
                                <p>Instrument</p><input type='text'></input>
                                
                                </div>
                                <br></br>   
                                <div className='field'>
                                <p>Program</p><input type='text'></input>

                                </div>
                                <div className='field'>
                                <p>Number of Sessions</p><input type='text'></input>

                                </div>
                                
                               
                                
                                
                               
                            </div>
                    </div>
                    <div className='summary'>
                        <div className='summary-container'>
                            <div>
                                <h1>Summary</h1>
                                <p>Details: </p>
                                <p>Instrument: </p>
                                <p>Minutes: </p>
                                <p>Sessions: </p>
                            </div>
                            <div className='summary-bottom'>
                                <p>Total: </p>
                                <button>Proceed</button>               
                            </div>             
                        </div> 
                    </div>
                </div>
        </div>
         
            
    )

}