import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{ useState,useEffect } from 'react'


import '../public/styles/App.css'
import { useLocation,useNavigate } from 'react-router-dom'
import TableStudentRecDetails from '../components/TableStudentRecDetails';
import TableFacultyDetails from '../components/TableFacultyDetails';

export default function FacultyManageDetails() {
    const navigate = useNavigate()
    const location=useLocation()

    const[preferredClasses,setPreferredClasses] = useState([])


   const user= location.state.user
   const teacher = location.state.teacher

   useEffect(() => { 

    if(location.state ==null){
        alert('You should not be here')
        navigate(-1)
    }else{
        //initialize function
        fetch(`http://localhost:3000/facultymanage/details/specific`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                user,teacher
            })
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setPreferredClasses(json)  //set enrollment data into "data"
             })
        })
    }
    
    
}, [])


    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className='content-container'>
            <h1>{user.lastName}, {user.firstName}</h1>
            <div className='table-container2'>
                <table cellSpacing={0}>
                    <tr className='table-headers'>
                        <td>Schedule</td>
                    </tr>
                    <tr className='table-headers2'>
                        <td>Day/s</td>
                        <td>Program</td>
                        <td>Time</td>
                        <td>Status</td>
                        <td>Student Enrolled</td>
                        <td></td>
                    </tr>
                    
                        {preferredClasses.map((input,index)=>{
                            return(
                                
                                <>
                                    <TableFacultyDetails preferredClass={input} user={user} teacher={teacher}/>               
                                </>
                            )
                          
                        })}
                        
                   
                </table>
                
            </div>
            </div>
        </div>
    )

}