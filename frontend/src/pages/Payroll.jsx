import { set } from 'mongoose';
import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import TablePayroll from '../components/TablePayroll';
import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



export default function PayrollPage() {

    const [teachers, setTeachers] = useState([])
    


    useEffect(() => { //initialize function
        fetch('http://localhost:3000/payroll',{ //get function from home.js (get enrollment data)
            method:'PUT',
            
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setTeachers(json) //set enrollment data into "data"
            })
        })

    }, [])

    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className = 'content-container'>
                <h1>Payroll</h1>
                <div className='table-container2'>
                    <table cellSpacing={0}>
                         <tr className='table-headers'>
                            <td>Faculty</td>
                         </tr>
                         <tr className='table-headers2'>
                            <td>Last Name</td>
                            <td>First Name</td>
                            <td>Instrument</td>
                            <td>Salary Date</td>
                            <td>Payment Option</td>
                            <td>Status</td>
                            <td></td>
                         </tr>
                         {teachers.map((input,index)=>{
                                return(
                                    <tr key={index}>
                                        <TablePayroll teacher={input}/>
                                    </tr>
                                )
                            })}
                        
                    </table>
                </div>
            </div>
        </div>
    )

}