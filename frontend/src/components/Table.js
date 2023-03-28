
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import React,{ useState,useEffect } from 'react'

export default function Table (props){

    const [query, setQuery] = useState('')
    const id=props.tableData.teacher_ID

    


    useEffect(() => { //initialize function
        
        fetch(`http://localhost:3000/${props.url}`,{ //get function from home.js (get enrollment data)
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
    
        console.log('Data: '+query) //query = data of user(teacher) props is data of preferred class
    
    }, [])

    return (
          
            <>
            <td>{props.tableData.instrument}</td>
            <td>{props.tableData.days}</td>
            <td>????????????</td>
            <td>{query.firstName} {query.lastName}</td>
            </>
        
    );
}
