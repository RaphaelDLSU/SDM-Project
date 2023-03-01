import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState} from 'react';
import axios from 'axios';
import '../public/styles/App.css'

export default function EnrollDashPage() {

    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className ='enrollment-separate'>
                <div className='content-container'>
                    <h1>Current Enrollments</h1>
                    <div className='table-container'>
                        <table>
                            <tr className='table-headers'>
                                <td>Date</td>
                                <td>Instrument</td>
                                <td>Program</td>
                                <td>Number of Sessions</td>
                                <td>Payment Status</td>
                                <td>Level</td>
                                <td>Enrollment Status</td>
                            </tr>
                            <tr>
                                <td>MM/DD/YYYY</td>
                                <td>Piano</td>
                                <td>1 hour</td>
                                <td>8</td>
                                <td>Partially Paid</td>
                                <td>Beginner</td>
                                <td>Pending</td>
                            </tr>
                            <tr>
                                <td>MM/DD/YYYY</td>
                                <td>Piano</td>
                                <td>1 hour</td>
                                <td>8</td>
                                <td>Partially Paid</td>
                                <td>Beginner</td>
                                <td>Pending</td>
                            </tr>
                        </table>
                    </div>     
                </div>
                <div className='content-container'>
                    <h1>Past Enrollments</h1>
                    <div className='table-container'>
                        <table>
                            <tr className='table-headers'>
                                <td>Date</td>
                                <td>Instrument</td>
                                <td>Program</td>
                                <td>Number of Sessions</td>
                                <td>Payment Status</td>
                                <td>Level</td>
                                <td>Enrollment Status</td>
                            </tr>
                        </table>
                    </div>     
                </div>
            </div>
            
        </div>
 
            
    )

}