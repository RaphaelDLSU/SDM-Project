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
    const program = location.state.program

   
    const [selectedProgram, setSelectedProgram] = useState('')  

    


    

    if (program === '') {
        return <>Still loading...</>;
      }
      else{
        return(
            <div className='with-sidebar'>
                <Sidebar/>
                <div className = 'content-container'>
                    <h1>{student.firstName} {student.lastName} ({program.program} {program.instrument})</h1>
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
                             {program.status=='On Hold' &&(
                                <h3 className='alert'>Student's Enrollment is on hold</h3>
                             )}
                             {program.status!='On Hold' &&(
                                <TableSessions teacher={teacher} student={student} program={program} status='Present'/>
                             )}
                             
                           
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
                             {program.status=='On Hold' &&(
                                <h3 className='alert'>Student's Enrollment is on hold</h3>
                             )}
                             {program.status!='On Hold' &&(
                                <TableSessions teacher={teacher} student={student} program={program} status='Past'/>
                             )}
                           
                        </table>
                    </div>
                </div>
            </div>
        );

      }

    

    
}

