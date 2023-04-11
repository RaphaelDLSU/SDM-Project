import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{ useState,useEffect } from 'react'
import TableFaculty from '../components/TableFaculty';
import {decodeToken} from 'react-jwt'
import TableMyStudent from '../components/TableMyStudent';
import { useLocation,useNavigate } from 'react-router-dom'
import TableSessions from '../components/TableSessions';
import TableStudentEnrollments from '../components/TableStudentEnrollments';




export default function StudentEnrollments() {
    const navigate = useNavigate()

    const token = localStorage.getItem('token')
    const [enrollmentsCurrent, setEnrollmentsCurrent] = useState([])
    const [enrollmentsPast, setEnrollmentsPast] = useState([])
    const user = decodeToken(token)


    useEffect(() => { //initialize function
        fetch('http://localhost:3000/studentenrollments',{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user
            }),
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setEnrollmentsCurrent(json[0])
                setEnrollmentsPast(json[1]) //set enrollment data into "data"
            })
        })
    }, [])


    if (enrollmentsPast === '') {
        return <>Still loading...</>;
      }
      else{
        return(
            <div className='with-sidebar'>
                <Sidebar/>
                <div className = 'content-container'>
                    <div className='table-container2'>
                        <h1>Current Enrollments</h1>
                        <table cellSpacing={0}>
                             <tr className='table-headers2'>
                                <td>Date</td>
                                <td>Instrument</td>
                                <td>Program</td>
                                <td>Number of Sessions</td>
                                <td>Payment Status</td>
                                <td>Status</td>
                             </tr>
                             {enrollmentsCurrent.map((input,index)=>{
                                return(
                                    
                                        <TableStudentEnrollments enrollment ={input}/>
                                   
                                )
                            })}
                             
                        </table>
                    </div>
                    <div className='table-container2'>
                        <h1>Past Enrollments</h1>
                        <table cellSpacing={0}>
                             <tr className='table-headers2'>
                             <td>Date</td>
                                <td>Instrument</td>
                                <td>Program</td>
                                <td>Number of Sessions</td>
                                <td>Payment Status</td>
                                <td>Status</td>
                             </tr>
                             {enrollmentsPast.map((input,index)=>{
                                return(
                                   
                                        <TableStudentEnrollments enrollment ={input}/>
                                   
                                )
                            })}

                            <button onClick={()=>navigate('/enrollform')}>New Enrollment</button>
                           
                        </table>
                    </div>
                </div>
            </div>
        );

      }

    

    
}

