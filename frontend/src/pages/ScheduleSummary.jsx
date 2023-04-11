import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import { useLocation,useNavigate } from 'react-router-dom'
import React,{useState,useRef,useEffect} from 'react';
import TableSchedSummary from '../components/TableSchedSummary';

export default function SchedSumPage() {

    const location=useLocation()
    const [classes, setClasses] = useState([])
    const [classes2, setClasses2] = useState([])
    const [teacher, setTeacher] = useState('')
    const [teacher2, setTeacher2] = useState('')

    const user_ID=location.state.user_ID
    const program = location.state.program

    useEffect(() => { 
        if(location.state ==null){
            alert('You should not be here')
        }else{
            //initialize function
            fetch(`http://localhost:3000/schedsummary`,{ //get function from home.js (get enrollment data)
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    user_ID,program
                })
            }).then(response => { //response == response is enrollment data
                response.json().then(json=>{ //response needs to be turned into JSON
                    setClasses(json[0])
                    setTeacher(json[1])
                    setTeacher2(json[2])
                    setClasses2(json[3])  //set enrollment data into "data"
                 })
            })
        }  
    }, [])

    if (teacher2 === '') {
        return <>Still loading...</>;
      }
    else{
        return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div class="schedsum">
            <div>
            <h1>My Schedule</h1>
                <p class="sumheaders">Instrument</p>
                <p class="sumtext">{program.instrument}</p>
                </div>
            <div>
                <p class="sumheaders">Faculty</p>
                <p class="faculty">{teacher.firstName} {teacher.lastName}</p>
                </div>
            <div>
                <p class="sumheaders">General Instructions</p>
                <ol class="suminstructions">
                    <li>INSTALL ZOOM in your device</li>
                    <li>The zoom links are provided in your schedule below. Simply click on the text to access.</li>
                    <li>Secure your connection and make sure to get your equipment ready 5-10 minutes before the lesson</li>
                    <li>Wait for your teacher to admit you in the room</li>
                    <li>Commence Lesson</li>
                </ol>
            </div>
            <div>
            <p class="sumheaders">Upcoming Sessions</p>
            
            <div className='table-container'>
                        <table cellSpacing={0}>
                            <tr className='table-headers'>
                                <td>Day</td>
                                <td>Date</td>
                                <td>Time</td>
                                <td>Zoom Link</td>
                                <td></td>
                            </tr>
                            {classes.map((input,index)=>{
                                return(
                                    <tr key={index}>
                                       <TableSchedSummary class={input} attendance=''/>
                                    </tr>  
                                )
                            })}
                        </table>
                </div>
                <p class="sumheaders">Past Sessions</p>
            
            <div className='table-container'>
                        <table cellSpacing={0}>
                            <tr className='table-headers'>
                                <td>Day</td>
                                <td>Date</td>
                                <td>Time</td>
                                <td>Attendance</td>
                                <td>Notes & Feedback</td>
                            </tr>
                            
                            {classes2?.map((input,index)=>{
                                return(
                                    <tr key={index}>
                                       <TableSchedSummary class={input} attendance='Past'/>
                                    </tr>  
                                )
                            })}
                        </table>
                </div>
            </div>
            </div>
        </div>
      
    )
                    }

}