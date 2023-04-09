
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import React,{ useState,useEffect,useRef } from 'react'
import TableSessionsDetails from './TableSessionsDetails';

export default function TableSessions (props){

    const [classes, setClasses] = useState([])
    
   
    const program = props.program

    let isPast

    if(props.status ==='Present'){
        isPast=false
    }
        
    else{ 
        isPast=true

    }
    
    useEffect(() => { //initialize function
        try{
            console.log('Program : '+JSON.stringify(program))
            fetch(`http://localhost:3000/mystudents/manage/sessions`,{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                program,isPast 
            }),
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setClasses(json) //set enrollment data into "data"
            })
        })
        }catch(err){
            console.log('ERROR: '+err)
        }
    }, [])
    return (
        <>
        {classes.map((input,index)=>{
            return(
                <tr key={index}>
                   <TableSessionsDetails classes={input} program={program} isPast={isPast} index={index}/>
                </tr>
            )
        })}
        </>
        
    
);
   
}
