
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TableMyStudent (props){
    const navigate = useNavigate()

    const [studentUser, setStudentUser] = useState('')
    const [enrollment, setEnrollment] = useState('')
    const [student, setStudent] = useState('')
    const program=props.program

    


    useEffect(() => { //initialize function
        
        fetch(`http://localhost:3000/mystudents/details`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                program, 
            }),
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setStudentUser(json[0])
                setEnrollment(json[1])
                setStudent(json[2]) //set enrollment data into "data"
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
                program,e 
            }),
        })

        console.log('LOL')
    }

    return (
            <>
            <td>{enrollment.date}</td>
            <td>{studentUser.lastName}</td>
            <td>{studentUser.firstName}</td>
            <td>
                <select onChange={e=>handleLevelChange(e.target.value)}>
                    <option>{program.level}</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Expert</option>
                </select>
            </td>
            <td>{program.program} {program.instrument}</td>
            <td> <button className='button1' onClick={()=>navigate('/mystudentmanage',{state:{student:studentUser,teacher:props.teacher,program:program}})}>Manage</button></td>
            </>
    );
}   
