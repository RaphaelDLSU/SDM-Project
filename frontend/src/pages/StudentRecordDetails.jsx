import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{ useState,useEffect } from 'react'


import '../public/styles/App.css'
import { useLocation,useNavigate } from 'react-router-dom'
import TableStudentRecDetails from '../components/TableStudentRecDetails';

export default function StudentRecordDetails() {
    const navigate = useNavigate()
    const location=useLocation()
   const [isShown, setIsShown] = useState(false);
   const [enrollment, setEnrollment] = useState('');
   const [program, setProgram] = useState([]);
   const [classes, setClasses] = useState([]);
   const [studentUser, setStudentUser] = useState('');


   

   const user_ID= location.state.user._id
   useEffect(() => { 

    if(location.state ==null){
        alert('You should not be here')
        navigate(-1)
    }else{
        //initialize function
        fetch(`http://localhost:3000/studentrecords/details/specific`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                user_ID
            })
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setProgram(json)  //set enrollment data into "data"
             })
        })
    }
    
    
}, [])

const getPastPrograms= ()=>{
    console.log('HERE')
    fetch(`http://localhost:3000/studentrecords/details/specific/past`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                user_ID
            })
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setProgram(json)  //set enrollment data into "data"
             })
        })
}
const getCurrentPrograms=async ()=>{
   
    await fetch(`http://localhost:3000/studentrecords/details/specific`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                user_ID
            })
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setProgram(json)  //set enrollment data into "data"
             })
        })
}

const student= location.state.user

    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className='content-container'>
            <h1>{student.lastName}, {student.firstName}</h1>
            <div className='table-container2'>
                <table cellSpacing={0}>
                    <tr className='table-headers'>
                        <td onClick={getCurrentPrograms}>Current Enrollment/s</td>
                        <td onClick={getPastPrograms}>Past Enrollments</td>
                    </tr>
                    <tr className='table-headers3'>
                        <td>Date Enrolled</td>
                        <td>Instrument</td>
                        <td>Program</td>
                        <td>Sessions</td>
                        <td>Level</td>
                        <td>Payment Status</td>
                        <td></td>
                    </tr>
                    
                        {program.map((input,index)=>{
                            return(
                                
                                <>
                                    {input.status==='Scheduled' || input.status==='Past' &&(
                                    <TableStudentRecDetails program={input} user_ID={user_ID}/>
                                    )}
                                    
                                </>
                            )
                          
                        })}
                        
                   
                </table>
                
            </div>
            </div>
        </div>
    )

}