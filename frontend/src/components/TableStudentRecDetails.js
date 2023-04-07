
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function TableStudentReDetails (props){
    const navigate = useNavigate()

    const [enrollment, setEnrollment] = useState('')
    const id=props.users._id

    


    useEffect(() => { //initialize function
        
        fetch(`http://localhost:3000/studentrecords/details`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id, 
            }),
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setEnrollment(json) //set enrollment data into "data"
            })
        })
    
       
    
    }, [])

    return (
        <>
        <td>{props.users.lastName}</td>
        <td>{props.users.firstName}</td>
        <td>{enrollment.status}</td>
        <td>{props.users.email}</td>
        <a onClick={()=>navigate('/studentrecdetails',{state:{student:props.users}})}>View Records</a>
        </>
        
            
        
    );
}