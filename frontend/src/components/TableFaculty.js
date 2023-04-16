
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function TableFaculty (props){
    const navigate = useNavigate()

    const [teacher, setTeacher] = useState('')
    const id=props.user._id

    

    useEffect(() => { //initialize function
        
        fetch(`http://localhost:3000/facultymanage/details`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id, 
            }),
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setTeacher(json) //set enrollment data into "data"
            })
        })
    
    
    }, [])

    

    return (
        <>
        <td>{props.user.lastName}</td>
        <td>{props.user.firstName}</td>
        <td>{teacher.instrument}</td>
        {teacher.hasStudents ===true &&(
            <td>Has Enrolled Students</td>
        )}
        {!teacher.hasStudents &&(
            <td>No Students</td>
        )}

        <td><button className='button2' onClick={()=>navigate('/facultymanagedetails',{state:{teacher:teacher,user:props.user}})}>View Schedule</button></td>
       
        </>
            
        
    );
}
