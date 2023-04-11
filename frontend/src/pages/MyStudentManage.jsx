import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{ useState,useEffect } from 'react'
import TableFaculty from '../components/TableFaculty';
import {decodeToken} from 'react-jwt'
import TableMyStudent from '../components/TableMyStudent';
import { useLocation,useNavigate } from 'react-router-dom'
import TableSessions from '../components/TableSessions';



export default function MyStudentManage() {

    const location = useLocation()
    const teacher = location.state.teacher
    const student = location.state.student

    const [program, setProgram] = useState([])  
    const [selectedProgram, setSelectedProgram] = useState('')  

    useEffect(() => { //initialize function
        fetch('http://localhost:3000/mystudents/manage',{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teacher,student
            })  
            
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setProgram(json)
                setSelectedProgram(json[0]) //set enrollment data into "data"
            })
        })
    }, [])
    


    const handleProgramChange = (e)=>{   

        console.log('Whatev this hsit is '+e)
        setSelectedProgram(e)
    }

    if (selectedProgram === '') {
        return <>Still loading...</>;
      }
      else{
        return(
            <div className='with-sidebar'>
                <Sidebar/>
                <div className = 'content-container'>
                    <h1>{student.firstName} {student.lastName}
                        <select onChange={e=>handleProgramChange(e.target.value)}>
                            {program.map((input,index)=>{
                                return(
                                    <option key={index} value={input}>
                                        {input.program}  {input.instrument}
                                    </option>
                                )
                                })}       
                        </select>
                    
                    </h1>
                    <div className='table-container2'>
                        <h2>Sessions</h2>
                        <table cellSpacing={0}>
                             <tr className='table-headers2'>
                                <td>Number</td>
                                <td>Day</td>
                                <td>Date</td>
                                <td>Time</td>
                                <td>Attendance</td>
                                <td>Notes & Feedback</td>
                                <td></td>
                             </tr>
                             <TableSessions teacher={teacher} student={student} program={selectedProgram} status='Present'/>
                           
                        </table>
                    </div>
                    <div className='table-container2'>
                        <h2>Past Sessions</h2>
                        <table cellSpacing={0}>
                             <tr className='table-headers2'>
                                <td>Number</td>
                                <td>Day</td>
                                <td>Date</td>
                                <td>Time</td>
                                <td>Attendance</td>
                                <td>Notes & Feedback</td>
                                <td></td>
                             </tr>
                             <TableSessions teacher={teacher} student={student} program={selectedProgram} status='Past'/>
                           
                        </table>
                    </div>
                </div>
            </div>
        );

      }

    

    
}

