import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState,useRef,useEffect} from 'react';
import '../public/styles/App.css'
import { decodeToken } from 'react-jwt';
import { useLocation,useNavigate } from 'react-router-dom'
import TableCreateSched from '../components/TableCreateSched';


export default function SchedCreatePage() {
    const navigate=useNavigate()
    const location=useLocation()
    const token = localStorage.getItem('token')
    const user = decodeToken(token)
    
    
    
    const [classesTemp,setClassesTemp] =useState('')
    const [teacherTemp,setTeacherTemp] =useState('')
    const[popup, setPop] = useState(false);
    const [classes, setClasses] = useState([])
    const [startDate,setStartDate]=useState('')
    const closePopup =()=>{
        setPop(false);
    }
   

    useEffect(() => { 

        if(location.state ==null){
            alert('You should not be here')
            navigate(-1)
        }else{
            const program= location.state.program
            //initialize function
            fetch('http://localhost:3000/schedulecreate',{ //get function from home.js (get enrollment data)
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    program
                })
            }).then(response => { //response == response is enrollment data
                response.json().then(json=>{ //response needs to be turned into JSON
                setClasses(json) //set enrollment data into "data"
            })
            })
        }
        
        
    }, [])
    const callback = payload => {
        setTeacherTemp(payload.query)
        setClassesTemp(payload.classes)

    }
    const isFirstRender = useRef(true)
    useEffect(() => { //Checks if details has loaded
        if (isFirstRender.current) {
          isFirstRender.current = false // toggle flag after first render/mounting
          return;
        }
        setPop(!popup)
    }, [classesTemp])
    
    const approveSchedule=()=>{
        const program= location.state.program
        fetch('http://localhost:3000/schedulecreate/approvesched',{ //get function from home.js (get enrollment data)
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    classesTemp,teacherTemp,user,program,startDate
                })
            })
    }

    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className='content-container'>
                <h1>Schedule Enrollment</h1>
                <p>Start Date : <input type='date'onChange={(e)=> setStartDate(e.target.value)}></input></p>
                <div className='table-container'>
                    <table cellSpacing={0}>
                        <tr className='table-headers'>
                            <td>Instrument</td>
                            <td>Day/s</td>
                            <td>Time</td>
                            <td>Faculty</td>
                            <td>Status</td>
                            <td></td>
                        </tr>
                        {classes.map((input,index)=>{
                            return(
                                <tr key={index}>
                                    <TableCreateSched tableData ={input} callback ={callback}/>
                                </tr>
                                
                                
                            )
                        })}
                    </table>
                    {popup?
                        <div className='main'>
                            <div className='popup'>
                                <div className='popup-header'>
                                <h1>Please Confirm Selection</h1>
                                
                                <h1 onClick={closePopup}>x</h1>
                                </div>
                                <div className='popup-content'>
                                    <h2>Selected Schedule</h2>
                                    <p>Instrument: {classesTemp.instrument}</p>
                                    <p>Days : {classesTemp.days}</p>
                                    <p>Faculty: {teacherTemp.firstName}  {teacherTemp.lastName}</p>
                                    <p>Time: {classesTemp.startTime} -- {classesTemp.endTime}</p>
                                    <p>Start Day: {startDate}</p>
                                    <button className='button1' onClick={approveSchedule}>Approve</button>
                                </div>

                               
                                
                                    
                                
                
                            </div>
                        </div>:""}
                </div>
            </div>
        </div>
    )

}