import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{ useState,useEffect,useRef } from 'react'

export default function FreeTrialPending() {
    const [data, setData] = useState([])
    const [popup, setPop] = useState(false)
    const [details, setDetails] = useState('')
    const [preferredClass, setPreferredClass] = useState('')

    useEffect(() => { //initialize function
        fetch('http://localhost:3000/freetrialpending',{ //get function from home.js (get enrollment data)
            method:'PUT'
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setData(json[0]) //set enrollment data into "data"
                setPreferredClass(json[1])
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
        console.log('Details :'+JSON.stringify(details))
        setPop(!popup) // do something after state has updated
      }, [details])


      const  handleClickOpen =async (input)=>{
      setDetails(input);
    }
    const closePopup =()=>{
        setPop(false);
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
                                    <td><button className='button2' type="button" onClick={() => handleClickOpen({input})}>View Details</button></td>
                                </tr>
                            )
                         })}
                    </table>
                    {popup?
                    <div className='main'>
                        <div className='popup'>
                            <div className='popup-header'>
                            <h1>{details.input.email}</h1>
                                <h1 onClick={closePopup}>x</h1>
                            </div>
                            <div className='popup-content'>
                            <h2>Personal Details</h2>
                            <p>Name: {details.input.firstName} {details.input.lastName}</p>
                            <p>Age: {details.input.age}</p>
                            <p>Country of Residence: {details.input.country}</p>
                            <p>Gender: {details.input.gender}</p>
                            <p>Parent/Guardian Name: {details.input.parent}</p>
                            </div>
                            <div className='popup-content-right'>
                             <h2>Free Trial Schedule</h2>
                             <p>Date: {preferredClass.day}</p>
                            </div>
                            {/* <button className='button1' onClick={approveEnrollment}>Approve</button> */}
                        </div>
                    </div>:""}
                </div>
            </div>
        </div>
    )

}