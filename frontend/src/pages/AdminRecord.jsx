import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState} from 'react';
import '../public/styles/App.css'

export default function AdminRecord() {
    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className='content-container'>
            <h1>De La Cruz, Juan</h1>
            <div className='table-container2'>
                <table cellSpacing={0}>
                    <tr className='table-headers'>
                        <td>Current Enrollment/s</td>
                        <td>Past Enrollments</td>
                    </tr>
                    <tr className='table-headers2'>
                        <td>Date Enrolled</td>
                        <td>Instrument</td>
                        <td>Program</td>
                        <td>Sessions</td>
                        <td>Level</td>
                        <td>Payment Status</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>MM/DD/YYYY</td>
                        <td>Piano</td>
                        <td>1 hour</td>
                        <td>8</td>
                        <td>Beginner</td>
                        <td>Partially Paid</td>
                        <td><button className='button2'>Dropdown</button></td>
                    </tr>
                </table>
                <table cellSpacing={0}>
                <tr className='table-headers3'>
                        <td>Remaining Balance</td>
                        <td></td>
                    </tr>
                <tr>
                    <td>PHP X,XXX</td>
                    <td><button className='button2'>View</button>&nbsp;<button className='button3'>Notify</button>&nbsp;<button className='button1'>Place On Hold</button></td>
                </tr>
                </table>
                <table cellSpacing={0}>
                <tr className='table-headers3'>
                        <td>Schedule</td>
                    </tr>
                <tr>
                    <tr>Day/s</tr>
                    <tr>Time</tr>
                    <tr>Faculty</tr>
                    <tr>Completed Sessions</tr>
                    <tr>Remaining Sessions</tr>
                </tr>
                </table>
            </div>
            </div>
        </div>
    )

}