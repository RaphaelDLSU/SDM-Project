import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState} from 'react';
import '../public/styles/App.css'

export default function SchedPage() {
    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className='content-container'>
                <h1>Schedule Enrollment</h1>
                <h2>Please select an enrollment to schedule</h2>
                <div className='table-container'>
                    <table cellSpacing={0}>
                        <tr className='table-headers'>
                            <td>Instrument</td>
                            <td>Program</td>
                            <td>Number of Sessions</td>
                            <td>Status</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Piano</td>
                            <td>1 hour</td>
                            <td>8</td>
                            <td>Not Scheduled</td>
                            <td><button className='button2'>Schedule</button></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )

}