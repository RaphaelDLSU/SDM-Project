import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{ useState,useEffect } from 'react'
import { List } from '@mui/material';

export default function EnrollPending() {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/enrollpending',{
            method:'GET'
        }).then(response => {
            response.json().then(json=>{
                setData(json)
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
                         {data.map((input,index)=>{
                            return(
                                <tr key={index}>
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