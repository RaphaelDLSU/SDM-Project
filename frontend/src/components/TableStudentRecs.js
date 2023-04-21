
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



export default function TableStudentRecs (props){
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
        {enrollment!=''&&(
            <>
            <td>{props.users.lastName}</td>
            <td>{props.users.firstName}</td>
            <td>{enrollment.status}</td>
            <td>{props.users.email}</td>
            <td><button className='button1'onClick={()=>navigate('/studentrecdetails',{state:{user:props.users}})}>View Records</button></td>
            </>
        )}
        </>
        
            
        
    );
}
