
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import React,{ useState,useEffect,useRef } from 'react'

export default function TableCreateSched (props){

    const [query, setQuery] = useState('')
    const [teacher, setTeacher] = useState('')
    const[popup, setPop] = useState(false);
   
    const classes= props.tableData
    const id=classes.teacher_ID

    const closePopup =()=>{
        setPop(false);
      
    }

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
                setQuery(json[0]) 
                setTeacher(json[1])//set enrollment data into "data"
            })
        })
    
        console.log('Data: Table '+query) //query = data of user(teacher) props is data of preferred class

        }catch(err){
            console.log('ERROR: '+err)
        }
    }, [])
    const handleCallback = () => props.callback({classes,query})

    const showTeacher=()=>{
       setPop(!popup)
    }




    return (
          
        <>
        <td>{classes.instrument}</td>
        <td>{classes.days}</td>
        <td>{classes.startTime} -- {classes.endTime}</td>
        <td onClick={showTeacher}  className='clickable'>{query.firstName} {query.lastName}</td>
        <td>{classes.status}</td>
        {classes.status=='Unavailable' &&(
            <td></td>
        )}
        {classes.status=='Available' &&(
            <td><button onClick={handleCallback}className='button2'>Schedule</button></td>
        )}
        

        {popup?
            <div className='main'>
                <div className='popup'>
                    <div className='popup-header'>
                    <h1>{query.firstName}  {query.lastName}</h1>
                    
                    <h1 onClick={closePopup}>x</h1>
                    </div>
                    <div className='popup-content'>
                        <p>Instrument: {teacher.instrument}</p>
                        <p>{teacher.biography}</p>
                    </div>
                </div>
            </div>:""}
        
        </>



        
    
);
   
}
