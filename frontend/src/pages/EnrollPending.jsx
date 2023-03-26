import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{ useState,useEffect } from 'react'
import { List } from '@mui/material';

export default function EnrollPending() {

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
                <h1>Pending Enrollments</h1>
                <div className='table-container2'>
                    <table cellSpacing={0}>
                         <tr className='table-headers'>
                            <td>Date</td>
                            <td>Time</td>
                            <td>Email</td>
                            <td></td>
                         </tr>


                         {data.map((input,index)=>{//READ DATA of enrollment
                            return(
                                <tr key={index}>   
                                {/* index == how many items to render */}
                                    <td>{input.offer_ID}</td>
                                    <td>{input.instrument}</td>
                                    <td>{input.status}</td>
                                    <button
                                 type="button"
                                 >
                                 </button>  
                                </tr>
                                
                            )
                                
                            })}
                    </table>
                </div>
            </div>

          
        </div>
    )

}