
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function TablePayrollCountSessions (props){
    const teacher=props.teacher
    const classes = props.class
    const [hourCount, setHourCount] = useState('')
    const [minCount, setMinCount] = useState('')
    

    useEffect(() => { //initialize function
        
        fetch(`http://localhost:3000/payroll/getcompletedsessions`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teacher, 
            }),
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setHourCount(json[0])
                setMinCount(json[1]) //set enrollment data into "data"
            })
        })
    
    
    }, [])

    // const proceedPayroll=()=>{
    //     fetch(`http://localhost:3000/payroll/getcompletedsessions`,{ //get function from home.js (get enrollment data)
    //         method:'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             user, 
    //         }),
    //     }).then(response => { //response == response is enrollment data
    //         response.json().then(json=>{ //response needs to be turned into JSON
    //             setClasses(json) //set enrollment data into "data"
    //         }).then(()=>setPop(!popupSecond))
    //     })
        
    // }

    
    return (
        <>
        <h3>{hourCount} Completed 1 hour Sessions </h3>
        <h3>{minCount} Completed 30 min Sessions </h3>
        
        </>
            
    );

      

    
}       
