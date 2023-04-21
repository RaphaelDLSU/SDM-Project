import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{ useState,useEffect,useRef } from 'react'

export default function FreeTrialPending() {
    const [data, setData] = useState([])
    const [popup, setPop] = useState(false)
    const [details, setDetails] = useState('')
    const [preferredClass, setPreferredClass] = useState('')
    const [inputTemp,setInputTemp]=useState('')
    const[teacher,setTeacher]=useState('')

    useEffect(() => { //initialize function
        fetch('http://localhost:3000/freetrialpending',{ //get function from home.js (get enrollment data)
            method:'PUT'
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setData(json) //set enrollment data into "data"
            })
        })

        // console.log('Data: '+data.offer_ID)

    }, [])

    const isFirstRender = useRef(true)
    useEffect(() => { //Checks if details has loaded
        if (isFirstRender.current) {
          isFirstRender.current = false // toggle flag after first render/mounting
          return;
        }
        setPop(!popup) // do something after state has updated
      }, [preferredClass])
      
    const closePopup =()=>{
        setPop(false);
    }

    const  handleClickOpen =async (input)=>{

        setInputTemp(input)

       
       
        await fetch('http://localhost:3000/freetrialpending/details',{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input //Sent enrollment data of student
        }),
        
        }).then(response => {
            response.json().then( json=>{ 
                 setPreferredClass(json[0])
                 setTeacher(json[1])
                 console.log(JSON.stringify(json))
            })
        })
        
        
        
    }
    const  sendEmail =()=>{
       
        fetch('http://localhost:3000/freetrialpending/send',{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputTemp,preferredClass //Sent enrollment data of student
        }),
        
        })
        
        
        
    }



    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className = 'content-container'>
                <h1>Free Trial</h1>
                <div className='table-container2'>
                    <table cellSpacing={0}>
                         <tr className='table-headers'>
                            <td>Date</td>
                            <td>Time</td>
                            <td>Email</td>
                            <td></td>
                         </tr>
                         {data.map((input,index) =>{
                            return(
                                <tr key={index}>
                                    <td>{input.date}</td>
                                    <td>{input.time}</td>
                                    <td>{input.email}</td>
                                    <td><button className='button1' type="button" onClick={() => handleClickOpen({input})}>View Details</button></td>
                                </tr>
                            )
                         })}
                    </table>
                    {popup?
                    <div className='main'>
                        <div className='popup'>
                            <div className='popup-header'>
                            <h1>{inputTemp.input.email}</h1>
                                <h1 onClick={closePopup}>x</h1>
                            </div>
                            <div className='popup-content'>
                            <h2>Personal Details</h2>
                            <p>Name: {inputTemp.input.firstName} {inputTemp.input.lastName}</p>
                            <p>Age: {inputTemp.input.age}</p>
                            <p>Country of Residence: {inputTemp.input.country}</p>
                            <p>Gender: {inputTemp.input.gender}</p>
                            <p>Parent/Guardian Name: {inputTemp.input.parent}</p>
                            </div>
                            <div className='popup-content-right'>
                             <h2>Free Trial Schedule</h2>
                             <p>Day: {inputTemp.input.day}</p>
                             <p>Time: {preferredClass.startTime}--{preferredClass.endTime}</p>
                             <p>Instrument: {inputTemp.input.instrument}</p>
                             <p>Faculty: {teacher.firstName}  {teacher.lastName}</p>
                             <p>Zoom link: {preferredClass.zoomLink}</p>
                            </div>
                             <button className='button1' onClick={sendEmail}>Approve</button>
                        </div>
                    </div>:""}
                </div>
            </div>
        </div>
    )

}