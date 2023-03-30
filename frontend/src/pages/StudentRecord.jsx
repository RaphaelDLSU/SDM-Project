import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{ useState,useEffect } from 'react'


export default function StudentRecord() {
    
    const [data, setData] = useState([]) //if mapping, turn it into array (useState([]))



    

    useEffect(() => { //initialize function
        fetch('http://localhost:3000/enrollpending',{ //get function from home.js (get enrollment data)
            method:'GET'
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setData(json) //set enrollment data into "data"
            })
        })

        console.log('Data: '+data.offer_ID)

    }, [])

    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className = 'content-container'>
                <h1>Student Records</h1>
                <div className='table-container2'>
                    <table cellSpacing={0}>
                         <tr className='table-headers'>
                            <td>Schedule</td>
                         </tr>
                         <tr className='table-headers2'>
                            <td>Last Name</td>
                            <td>First Name</td>
                            <td>Enrollment Status</td>
                            <td>Email</td>
                            <td></td>
                         </tr>
                         {data.map((input,index)=>{//READ DATA of enrollment
                            return(
                                <tr key={index}>   
                                {/* index == how many items to render */}
                                    <td>{input.firstName}</td>
                                    <td>{input.lastName}</td>
                                    <td>{input.status}</td>
                                    <td>{input.email}</td>  
                                </tr>
                            )
                            })}            
                    </table>
                </div>
            </div>
        </div>
    );

    
}

