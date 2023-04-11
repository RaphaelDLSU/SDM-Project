
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import React,{ useState,useEffect,useRef } from 'react'

export default function Table (props){

    const [query, setQuery] = useState('')
    const id=props.tableData.teacher_ID
    

   

    useEffect(() => { //initialize function
        try{
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
    
        console.log('Data: Table '+query) //query = data of user(teacher) props is data of preferred class

        }catch(err){
            console.log('ERROR: '+err)
        }
    }, [])

    const isFirstRender = useRef(true)
    useEffect(() => { //Checks if details has loaded
        if (isFirstRender.current) {
          isFirstRender.current = false // toggle flag after first render/mounting
          return;
        }

        console.log('Details :'+JSON.stringify(props))
        try{
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
    
        console.log('Data: Table '+query) //query = data of user(teacher) props is data of preferred class

        }catch(err){
            console.log('ERROR: '+err)
        }
        
      }, [props])

      const handleCallback = () => props.callback(props.tableData)
    return (
          
        <>
        <td>{props.tableData.instrument}</td>
        <td>{props.tableData.days}</td>
        <td>{props.tableData.startTime}--{props.tableData.endTime}</td>
        <td>{query.firstName} {query.lastName}</td>
        <button onClick={handleCallback} >Select</button>
        </>
    
);
   
}
