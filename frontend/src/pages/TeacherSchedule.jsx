import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState,useEffect,useRef} from 'react';
import '../public/styles/App.css'
import { decodeToken } from 'react-jwt';

export default function TeacherSchedule() {
    const token = localStorage.getItem('token')
    const user = decodeToken(token)
    const [schedule, setSchedule] = useState([])
    const [teacher, setTeacher] = useState([])
    const[popup, setPop] = useState(false);

    const[monday,setMonday]=useState(false)
    const[tuesday,setTuesday]=useState(false)
    const[wednesday,setWednesday]=useState(false)
    const[thursday,setThursday]=useState(false)
    const[friday,setFriday]=useState(false)
    const[saturday,setSaturday]=useState(false)
    const[sunday,setSunday]=useState(false)

    const[day,setDay]=useState("")
    const[time,setTime]=useState('')
    const[program,setProgram]=useState('')
    const[zoom,setZoom]=useState('')


    useEffect( ()=>{
        const initialize =async()=>{
            fetch('http://localhost:3000/teacherschedule',{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    user
                })
            }).then(response=>{
                response.json().then(json=>{
                   setSchedule(json[0])
                   setTeacher(json[1])
                })
            })
        }
        initialize()
    },[])
    
    const isFirstRender = useRef(true)
    useEffect(() => { //Checks if details has loaded
        if (isFirstRender.current) {
          isFirstRender.current = false // toggle flag after first render/mounting
          return;
        }
        console.log('Teacher Schedule Details :'+JSON.stringify(schedule))
        // update state is state changes IDK WTF BASTA ETO
    }, [schedule])
    useEffect(() => { //Checks if details has loaded
        if (isFirstRender.current) {
          isFirstRender.current = false // toggle flag after first render/mounting
          return;
        }
        console.log('Teacher Schedule Details :'+JSON.stringify(teacher))
        // update state is state changes IDK WTF BASTA ETO
    }, [teacher])



      
    const closePopup =()=>{
        setPop(false);
    }
    

    const handleFormChange =(event)=>{
        event.preventDefault()
        console.log('Value final: '+day+' '+time+' '+program+' '+zoom+' '+user.user_ID+''+teacher)

        const submit =async()=>{
            fetch('http://localhost:3000/teacherschedule/add',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    day,time,program,zoom,user,teacher
                })
            }).then(response=>{
                response.json().then(json=>{
                    if(json.status==='ok'){
                        alert('Added new schedule')
                    }
                })
            })
        }
        submit()

    }
    const handleCheckboxChange =(state,setState,e)=>{
        
        setState(!state)
        if(state==false){
            console.log('Day value: '+e.target.value)
            setDay(day+e.target.value)
        }else{
            console.log('Day value: '+e.target.value)
            setDay(day.replace(e.target.value,''))
        }
        console.log('Day mismo :'+day)

    }
    return(
        
        <div className='with-sidebar'>
            <Sidebar/>
            <div className='content-container'>
                <h1>My Schedule                        <button className='button2' onClick={()=>setPop(!popup)}>Add sched</button></h1>
                
                <div className='table-container'>
                    <table cellSpacing={0}>
                        <tr className='table-headers'>
                            <td>Day/s</td>
                            <td>Program</td>
                            <td>Time</td>
                            <td>Status</td>
                            <td></td>
                        </tr>
                        {schedule.map((input,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{input.days}</td>
                                    <td>{input.program}</td>
                                    <td>{input.startTime} to {input.endTime}</td>
                                    <td>{input.status}</td>
                                </tr>
                            )
                        })}
                       
                    </table>
                    {popup?
                    <div className='main'>
                        <div className='popup'>
                            <div className='popup-header'>
                            <h1>Add Schedule</h1>
                            
                                <h1 onClick={closePopup}>x</h1>
                            </div>
                            <form onSubmit={handleFormChange}>
                                <div className='popup-content'>
                                    <p>Day/s select all that apply</p>
                                    <input onChange={e=>handleCheckboxChange(monday,setMonday,e)} type="checkbox" name="monday" value="M"/>
                                    <label> Monday</label>
                                    <input  onChange={e=>handleCheckboxChange(tuesday,setTuesday,e)} type="checkbox" name="tuesday" value="T"/>
                                    <label>Tuesday</label>
                                    <input onChange={e=>handleCheckboxChange(wednesday,setWednesday,e)}type="checkbox" name="wednesday" value="W"/>
                                    <label> Wednesday</label>
                                    <input onChange={e=>handleCheckboxChange(thursday,setThursday,e)}type="checkbox" name="thursday" value="H"/>
                                    <label> Thursday</label>
                                    <input onChange={e=>handleCheckboxChange(friday,setFriday,e)}type="checkbox" name="friday" value="F"/>
                                    <label> Friday</label>
                                    <input onChange={e=>handleCheckboxChange(saturday,setSaturday,e)}type="checkbox" name="saturday" value="S"/>
                                    <label> Saturday</label> 
                                    <input onChange={e=>handleCheckboxChange(sunday,setSunday,e)}type="checkbox" name="sunday" value="U"/>
                                    <label> Sunday</label><br></br>

                                    <input type='time' name='time' onChange={e=>setTime(e.target.value)}/>
                                    <label> Choose a start time</label><br/> 

                                    <select onChange={e=>setProgram(e.target.value)}>
                                    <option disabled selected value> -- select an option -- </option>
                                        <option>1 hour</option>
                                        <option>30 min</option>
                                        <option>Free Trial 15 mins</option>
                                    </select>
                                    <label> Choose a program</label><br/> 
                                    <input type="text" name="zoom" onChange={e=>setZoom(e.target.value)}/>
                                    <label> Zoom Link</label><br/> 
                                </div>
                                <input type='submit' className='button1' value='Add Schedule'/>
                            </form>
                            

                                
                           
                            
                        </div>
                    </div>:""}
                </div>
            </div>
        </div>
    )

}