
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TablePayrollSession from './TablePayrollSession';
import TablePayrollCountSessions from './TablePayrollCountSessions';


export default function TablePayroll (props){
    
    const[popupFirst, setPopFirst] = useState(false);
    const[popupSecond, setPopSecond] = useState(false);
    const navigate = useNavigate()
    const [classes, setClasses] = useState([])
    const [completed1Hour, setCompleted1Hour] = useState('')
    const [completed30Min, setCompleted30Min] = useState('')

    const [user, setUser] = useState('')
    const teacher=props.teacher

    

    useEffect(() => { //initialize function
        fetch(`http://localhost:3000/payroll/list`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                teacher, 
            }),
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{
                setUser(json) 
            })
        })
    }, [])

    const closePopup =()=>{
        setPopFirst(false);setPopSecond(false);
    }

    const showPayroll=()=>{
        fetch(`http://localhost:3000/payroll/getclasses`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user, 
            }),
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setClasses(json) //set enrollment data into "data"
            }).then(()=>setPopFirst(!popupFirst))
        })
        
    }

    const proceedPayroll=()=>{
        setPopSecond(!popupSecond)
    }
   

    return (
        <>
            <td>{user.lastName}</td>
            <td>{user.firstName}</td>
            <td>{teacher.instrument}</td>
            <td>?</td>
            <td>{teacher.paymentOption}</td>
            <td><button onClick={showPayroll}>Generate Pay</button></td>
            

            {popupFirst?
            <>
                {classes === undefined &&(
                    <h1>Loading...</h1>
                )}
                {classes &&(
                    <div className='main'>
                        <div className='popup'>
                            <div className='popup-header'>
                                <h1>Please Confirm Selection</h1>
                                
                                <h1 onClick={closePopup}>x</h1>
                            </div>
                            <div className='popup-content'>
                                <table>
                                    <tr className='table-headers2'> 
                                        <td>Date</td>
                                        <td>Student</td>
                                        <td>Program</td>
                                        <td>Pay</td>
                                    </tr>

                                    {classes.map((input,index)=>{
                                        return(
                                            <tr key={index}>
                                                <TablePayrollSession teacher={user} class={input}/>
                                            </tr>
                                        )
                                    })}
                                </table>
                                <br></br><br></br>
                                <h3>Total Pay: PHP:XXX <button onClick={proceedPayroll}>Proceed</button></h3>
                                

                            </div>
                        </div>
                    </div>
                )}
                </>:""}
                {popupSecond?
                <>
                    {classes === undefined &&(
                        <h1>Loading...</h1>
                    )}
                    {classes &&(
                        <div className='main'>
                            <div className='popup'>
                                <div className='popup-header'>
                                    <h1>Completed Sessions</h1>
                                    
                                    <h1 onClick={closePopup}>x</h1>
                                </div>
                                <div className='popup-content'>
                                    <TablePayrollCountSessions teacher={user}/>
                                   
                                </div>
                            </div>
                        </div>
                    )}
                    </>:""}
            
        </>
    );

      
   
}       
