
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TablePayrollSession from './TablePayrollSession';
import TablePayrollCountSessions from './TablePayrollCountSessions';


export default function TableSchedSummary (props){

    const classes = props.class
    const isPast = props.attendance
    const [preferredClass, setPreferredClass] = useState('')
    const [popup, setPop] = useState(false)
    const [resched, setResched] = useState('')
    

    useEffect(() => { //initialize function
        fetch(`http://localhost:3000/schedsummary/details`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                classes,isPast
            }),
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{
                setPreferredClass(json) 
            })
        })
    }, [])

    const closePopup =()=>{
        setPop(false)
    }

    const handleResched = async ()=>{  
        await fetch(`http://localhost:3000/reschedule`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                resched,classes,preferredClass
            }),
        })

        
    }

    if (preferredClass === '') {
        return <>Still loading...</>;
      }
    else{
    return (
        <>
        {isPast=='' &&(
            <>
             <td>{classes.day}</td>
             <td>{classes.date}</td>
             <td>{preferredClass.startTime}--{preferredClass.endTime}</td>
             <td>{preferredClass.zoomLink}</td>
             </>
                                           
        )}
        {isPast=='Past' &&(
            <>
             <td>{classes.day}</td>
             <td>{classes.date}</td>
             <td>{preferredClass.startTime}--{preferredClass.endTime}</td>
             <td>{classes.attendance}</td>

            {classes.attendance=='Absent' &&(
                <td><button className='button1' onClick={()=>setPop(!popup)}>Reschedule</button></td>              
            )}
            {classes.attendance!='Absent' &&(
                 <td>{classes.note}</td>              
            )}   
            </>                                  
        )}

        {popup?
            <>
            <div className='main'>
                <div className='popup'>
                    <div className='popup-header'>
                        <h1>Schedule Make Up Class</h1>
                        
                        <h1 onClick={closePopup}>x</h1>
                    </div>
                    <div className='popup-content'>
                        <h2> Days: {preferredClass.days}</h2>
                        <h2> Time: {preferredClass.startTime}--{preferredClass.endTime}</h2>
                        <p> Make sure to set Date according to Class Day/s</p>
                        <input type='Date' onChange={(e)=>{setResched(e.target.value)}}/>
                        <br></br>
                        <button className='button1' onClick={handleResched}>Reschedule</button>
                      
                        
                    </div>
                </div>
            </div>      
                </>:""}  
        </>
        );
    }
      
   
}       
