import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState,useRef,useEffect} from 'react';
import '../public/styles/App.css'
import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router-dom'

export default function SchedPage() {
    const navigate=useNavigate()
    const token = localStorage.getItem('token')
    const user = decodeToken(token)

    const [enrollment, setEnrollment] = useState([])
    useEffect(() => { 
        
        //initialize function
        fetch('http://localhost:3000/schedulepage',{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                user
            })
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setEnrollment(json) //set enrollment data into "data"
            })
        })
    }, [])
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
                        {enrollment.map((input,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{input.instrument}</td>
                                    <td>{input.program}</td>
                                    <td>{input.numSessions}</td>
                                    <td>{input.status}</td>
                                    <td><button onClick={()=>navigate('/schedulecreate',{state:{program:input}})} className='button2'>Schedule</button></td>
                                </tr>
                                
                            )
                        })}
                   
                    </table>
                </div>
            </div>
        </div>
    )

}