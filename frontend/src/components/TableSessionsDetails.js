
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import React,{ useState,useEffect,useRef } from 'react'

export default function TableSessionsDetails (props){

    const classes = props.classes
    const program = props.program
    const isPast = props.isPast
    
    const [preferredClass, setPreferredClass] = useState('')
    const [attendance, setAttendance] = useState('')
    const [notes, setNotes] = useState('')

    useEffect(() => { //initialize function
        try{
            fetch(`http://localhost:3000/mystudents/manage/sessions/details`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                classes
            }),
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setPreferredClass(json) //set enrollment data into "data"
            })
        })
        }catch(err){
            console.log('ERROR: '+err)
        }
    }, [])

    const handleAttendance =()=>{
        fetch(`http://localhost:3000/mystudents/manage/sessions/update`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                attendance,notes,classes
            }),
        }).then(response=>{
            if(response.status==404){
                alert('You can only set attendance on the day of the class') 
            }
            else{
                window.location.reload()
            }
             
            })
       

    }
    return (
          
        <>
            <td>{props.index+1}</td>
            <td>{classes.day}</td>
            <td>{classes.date}</td>
            <td>{preferredClass.startTime}--{preferredClass.endTime}</td>
            {!isPast &&(
                <td>
                    <select onChange={e=>setAttendance(e.target.value)}>
                        <option disabled selected value> -- </option>
                        <option>Present</option>
                        <option>Absent</option>
                        <option>Forfeited</option>
                    </select>               
                </td>
            )}
            {isPast &&(
                <td>{classes.attendance}</td>
            )}
            {!isPast &&(
                <td><input type='text' onChange={e=>setNotes(e.target.value)}></input></td>
            )}
            {isPast &&(
                <td>{classes.note}</td>
            )}

            {!isPast &&(
                <td><button onClick={handleAttendance} >Done</button></td>
            )}
            {isPast &&(
                <td><a>More</a></td>
            )}
        </>
        
    
);
   
}
