import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{ useState,useEffect } from 'react'
import TableFaculty from '../components/TableFaculty';
import {decodeToken} from 'react-jwt'
import TableMyStudent from '../components/TableMyStudent';



export default function MyStudents() {
    const token = localStorage.getItem('token')
    const user = decodeToken(token)


   
    
    const [programs, setPrograms] = useState([]) //if mapping, turn it into array (useState([])

    

    useEffect(() => { //initialize function
        fetch('http://localhost:3000/mystudents',{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user
            })
            
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setPrograms(json) //set enrollment data into "data"
            })
        })
    }, [])

   

    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className = 'content-container'>
                <h1>My Students</h1>
                <div className='table-container2'>
                    <table cellSpacing={0}>
                         <tr className='table-headers2'>
                            <td>Date Enrolled</td>
                            <td>Last Name</td>
                            <td>First Name</td>
                            <td>Level</td>
                            <td>Program</td>
                            <td></td>
                         </tr>
                         {programs.map((input,index)=>{//READ DATA of enrollment
                            return(
                                <tr key={index}>
                                    <TableMyStudent program={input} teacher={user}/>
                                </tr>

                                
                            )
                            })}            
                    </table>
                </div>
            </div>
        </div>
    );

    
}

