import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{ useState,useEffect } from 'react'
import TableFaculty from '../components/TableFaculty';



export default function FacultyManage() {
    
    const [user, setUser] = useState([]) //if mapping, turn it into array (useState([])

    

    useEffect(() => { //initialize function
        fetch('http://localhost:3000/facultymanage',{ //get function from home.js (get enrollment data)
            method:'PUT',
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setUser(json) //set enrollment data into "data"
            })
        })


    }, [])

   

    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className = 'content-container'>
                <h1>Faculty</h1>
                <div className='table-container2'>
                    <table cellSpacing={0}>
                         <tr className='table-headers2'>
                            <td>Last Name</td>
                            <td>First Name</td>
                            <td>Instrument</td>
                            <td>Status</td>
                            <td></td>
                         </tr>
                         {user.map((input,index)=>{//READ DATA of enrollment
                            return(
                                <tr key={index}>
                                    <TableFaculty user={input}/>
                                </tr>

                                
                            )
                            })}            
                    </table>
                </div>
            </div>
        </div>
    );

    
}

