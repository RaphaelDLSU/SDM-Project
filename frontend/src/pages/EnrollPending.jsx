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
          setData(response)

          console.log("RESPONSE IS HERE IN JSX: "+JSON.stringify(response))
          console.log("DATA IS HERE IN JSX: "+data)
        })
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
                         <tr>
                            <td>MM/DD/YYYY</td>
                            <td>HH:MM - HH:MM PHT</td>
                            <td>juan_delacruz@gmail.com</td>
                            <td><button className='button2'>View Details</button></td>
                         </tr>
                    </table>
                </div>
            </div>

            {data.map((input,index)=>{
                <table>
                <tr key={index}>
                    <td>{input.offer_ID}</td>
                    <td>{input.instrument}</td>
                    <td>{input.status}</td>
                </tr>

                </table>
                
            })}
        </div>
    )

}