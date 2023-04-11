
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import React,{ useState,useEffect,useRef } from 'react'
import TableSessionsDetails from './TableSessionsDetails';

export default function TableStudentEnrollments (props){

    const [programs, setPrograms] = useState([])

    const enrollment = props.enrollment
    
    useEffect(() => { //initialize function
        try{
            fetch(`http://localhost:3000//studentenrollments/details`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                enrollment 
            }),
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setPrograms(json) //set enrollment data into "data"
            })
        })
        }catch(err){
            console.log('ERROR: '+err)
        }
    }, [])
    return (
        <>
        {programs.map((input,index)=>{
            return(
               <tr key={index}>
                  <td>{enrollment.date}</td>
                  <td>{input.instrument}</td>
                  <td>{input.program}</td>
                  <td>{input.numSessions}</td>
                  <td>{enrollment.paymentStatus}</td>
                  <td>{enrollment.status}</td>
               </tr> 
            )
        })}
        </>
        
    
);
   
}
