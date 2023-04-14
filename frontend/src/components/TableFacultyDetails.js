
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



export default function TableFacultyDetails (props){


    
    const [classes, setClasses] = useState([])
    const [isShown, setIsShown] = useState(false);
    const [student, setStudent] = useState('')


    const user = props.user
    const teacher = props.teacher
    const preferredClass = props.preferredClass
    


    useEffect(() => { //initialize function
        
        fetch(`http://localhost:3000/facultymanage/details/specific/class`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user,teacher,preferredClass
            }),
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ 

                console.log(JSON.stringify(preferredClass._id)+'  '+JSON.stringify(json))
                setClasses(json[0])
                setStudent(json[1])
            })
        })
    }, [])

    const handleClick = event => {
        console.log(JSON.stringify(classes))
        setIsShown (current => !current);
       };
   

    return (
        <>
        <tr>
            <td>{preferredClass.days}</td>
            <td>{preferredClass.program}</td>
            <td>{preferredClass.startTime} -- {preferredClass.endTime}</td>
            <td>{preferredClass.status}</td>
            {student!=undefined &&(
                <td>{student.firstName} {student.lastName}</td> 
            )}
            {student==undefined &&(
                <td>None</td> 
            )}
            {student!=undefined &&(
                 <td><button className='button2' onClick={handleClick}>Show</button></td> 
            )}
           
        </tr>
        
     

        { isShown && (
            <>  
            <tr className='table-headers'>
                <td>Sessions</td>
            </tr>

            <tr className='table-headers2'>
                <td>Number</td>
                <td>Day</td>
                <td>Date</td>
                <td>Time</td>
                <td>Student Attendance</td>
                <td></td>
            </tr>
            {classes.map((input,index)=>{
                return( 
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{input.day}</td>
                        <td>{input.date}</td>
                        <td>{preferredClass.startTime} -- {preferredClass.endTime}</td>
                        <td>{input.attendance}</td>
                    </tr>

                )
            })}
           
                </> )}
        
        </>
        
    );
}
