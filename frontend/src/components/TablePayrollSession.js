
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function TablePayrollSession (props){
    const teacher=props.teacher
    const classes = props.class
    const [student, setStudent] = useState('')
    const [program, setProgram] = useState('')
    

    useEffect(() => { //initialize function
        
        fetch(`http://localhost:3000/payroll/getclasses/details`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                classes, 
            }),
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setStudent(json[0])
                setProgram(json[1]) //set enrollment data into "data"
            })
        })
    
    
    }, [])

    if (program === '') {
        return <>Still loading...</>;
      }else{
        return (
            <>
                <td>{classes.date}</td>
                <td>{student.firstName} {student.lastName}</td>
                <td>{program.program}</td>
                <td>Payment</td>
            </>
    );

      }

    
}       
