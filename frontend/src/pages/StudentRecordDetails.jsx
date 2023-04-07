import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{ useState,useEffect } from 'react'


import '../public/styles/App.css'
import { useLocation,useNavigate } from 'react-router-dom'

export default function StudentRecordDetails() {
    const navigate = useNavigate()
    const location=useLocation()
   const [isShown, setIsShown] = useState(false);
   const [enrollment, setEnrollment] = useState('');
   const [program, setProgram] = useState([]);
   const [classes, setClasses] = useState([]);
   const [studentUser, setStudentUser] = useState('');


   const handleClick = event => {
    setIsShown (current => !current);
   };

   
   useEffect(() => { 

    if(location.state ==null){
        alert('You should not be here')
        navigate(-1)
    }else{
        const student_ID= location.state.student._id
        //initialize function
        fetch(`http://localhost:3000/studentrecords/details/specific`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                student_ID
            })
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
            setEnrollment(json[0])
            setProgram(json[1]) 
            setClasses(json[2])  //set enrollment data into "data"
             })
        })
    }
    
    
}, [])

const student= location.state.student

    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className='content-container'>
            <h1>{student.lastName}, {student.firstName}</h1>
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
                        {program.map((input,index)=>{
                            <>
                            <td>{enrollment.date}</td>
                            <td>{studentUser.student}</td>
                            <td>{input.program}</td>
                            <td>{input.numSessions}</td>
                            <td>{studentUser.level}</td>
                            </>
                        })}
                        <td><button className='button2' onClick={handleClick}>Show</button></td>
                    </tr>
                </table>
                { isShown && (
                <div>
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
                    </div> )}
            </div>
            </div>
        </div>
    )

}