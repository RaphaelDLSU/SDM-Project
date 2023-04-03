
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import React,{ useState,useEffect,useRef } from 'react'

export default function TableCreateSched (props){

    const [query, setQuery] = useState('')
    
   
    const classes= props.tableData
    const id=classes.teacher_ID

    

    useEffect(() => { //initialize function
        try{
            fetch(`http://localhost:3000/schedulecreate/table`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id, 
            }),
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setQuery(json) //set enrollment data into "data"
            })
        })
    
        console.log('Data: Table '+query) //query = data of user(teacher) props is data of preferred class

        }catch(err){
            console.log('ERROR: '+err)
        }
    }, [])
    const handleCallback = () => props.callback({classes,query})


    return (
          
        <>
        <td>{classes.instrument}</td>
        <td>{classes.days}</td>
        <td>{classes.startTime} -- {classes.endTime}</td>
        <td>{query.firstName} {query.lastName}</td>
        <td>{classes.status}</td>
        <td><button onClick={handleCallback}className='button2'>Schedule</button></td>
        
        </>
        
    
);
   
}