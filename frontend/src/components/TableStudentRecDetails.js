
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



export default function TableStudentRecDetails (props){


    
    const [enrollment, setEnrollment] = useState('')
    const [preferredClass, setPreferredClass] = useState('')
    const [student, setStudent] = useState('')
    const [isShown, setIsShown] = useState(false);
    const [teacher, setTeacher] = useState('')
    const [completedClass, setCompletedClass] = useState('')
    const [remainingClass, setRemainingClass] = useState('')
    const program = props.program
    const user_ID = props.user_ID
    


    useEffect(() => { //initialize function
        
        fetch(`http://localhost:3000/studentrecords/details/specific/program`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                program,user_ID, 
            }),
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setEnrollment(json[0])
                setPreferredClass(json[1])
                setStudent(json[2])
                setTeacher(json[3])
                setCompletedClass(json[4])
                setRemainingClass(json[5]) //set enrollment data into "data"
            })
        })
    
        
       
    
    }, [])

    const handleClick = event => {
        setIsShown (current => !current);
       };
   

    return (
        <>
        <tr>
            <td>{enrollment.date}</td>
            <td>{program.instrument}</td>
            <td>{program.program}</td>
            <td>{program.numSessions} Sessions</td>
            <td>{student.level}</td>
            <td>{enrollment.paymentStatus}</td>
            <td><button className='button2' onClick={handleClick}>Show</button></td>
        </tr>
        
     

        { isShown && (
            <>  
            <tr className='table-headers3'>
                    <td>Remaining Balance</td>
                    <td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td>PHP {enrollment.paymentRemaining}</td><td></td><td></td><td></td><td></td>
                <td><button className='button2'>View</button>&nbsp;<button className='button3'>Notify</button>&nbsp;<button className='button1'>Place On Hold</button></td>
            </tr>

            <tr className='table-headers3'>
                    <td>Schedule</td><td></td><td></td><td></td><td></td><td></td><td></td>
                </tr>
            <tr>
                <tr>Day/s: {preferredClass.days}</tr>
                <tr>Time: {preferredClass.startTime} -- {preferredClass.endTime}</tr>
                <tr>Faculty:{teacher.firstName} {teacher.lastName}</tr>
                <tr>Completed Sessions: {completedClass}</tr>
                <tr>Remaining Sessions: {remainingClass}</tr>
            </tr>
                </> )}
        
        </>
        
    );
}
