
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TableMyStudent (props){
    const navigate = useNavigate()

    const [studentUser, setStudentUser] = useState('')
    const student=props.student

    


    useEffect(() => { //initialize function
        
        fetch(`http://localhost:3000/mystudents/details`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                student, 
            }),
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setStudentUser(json) //set enrollment data into "data"
            })
        })
    
    }, [])

    const handleLevelChange =(e)=>{

        

        fetch(`http://localhost:3000/mystudents/levelchange`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                student,e 
            }),
        })

        console.log('LOL')
    }

    return (
          
            <>
            <td>?</td>
            <td>{studentUser.lastName}</td>
            <td>{studentUser.firstName}</td>
            <td>
                <select onChange={e=>handleLevelChange(e.target.value)}>
                    <option>{student.level}</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Expert</option>
                </select>
            </td>
            <td>{student.status}</td>
            <td> <button onClick={()=>navigate('/mystudentmanage',{state:{student:studentUser,teacher:props.teacher}})}>Manage</button></td>
            </>
        
    );
}   
