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
                <h1>Schedule Program</h1>
                <h2>Please select a program to schedule</h2>
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
                                    {input.status=='On Hold' &&(
                                               <td className='alert1'>{input.status}</td>
                                    )}
                                    {input.status!='On Hold' &&(
                                               <td >{input.status}</td>
                                    )}
                                    

                                    {input.status=='Scheduled' &&(
                                               <td><button onClick={()=>navigate('/schedsummary',{state:{program:input,user_ID:user.user_ID}})} className='button2'>View</button></td>    
                                        )}

                                    {input.status=='Not Scheduled' &&(
                                             <td><button onClick={()=>navigate('/schedulecreate',{state:{program:input}})} className='button2'>Schedule</button></td>
                                        )}
                                    
                                </tr>
                                
                            )
                        })}
                   
                    </table>
                </div>
            </div>
        </div>
    )

}