import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{ useState,useEffect,useRef } from 'react'
// import Modal from 'react-overlays/Modal';
import { List } from '@mui/material';
import '../public/styles/App.css'

export default function EnrollPending() {

    const [data, setData] = useState([]) //if mapping, turn it into array (useState([]))
    const [details, setDetails] = useState([])
    const [inputTemp, setInputTemp] = useState([])


    const[popup, setPop] = useState(false);
    const isFirstRender = useRef(true)

    useEffect(() => { //initialize function
        fetch('http://localhost:3000/enrollpending',{ //get function from home.js (get enrollment data)
            method:'GET'
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setData(json) //set enrollment data into "data"
            })
        })

        console.log('Data: '+data.offer_ID)

    }, [])
    
    useEffect(() => { //Checks if details has loaded
        if (isFirstRender.current) {
          isFirstRender.current = false // toggle flag after first render/mounting
          return;
        }
        console.log('Details :'+JSON.stringify(details))
        setPop(!popup) // do something after state has updated
      }, [details])


    const  handleClickOpen =async (input)=>{
       
        await fetch('http://localhost:3000/enrollpending/details',{ //get function from home.js (get enrollment data)
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            input //Sent enrollment data of student
        }),
        
        }).then(response => {
             //response == response is enrollment data
            response.json().then( json=>{ //response needs to be turned into JSON
                 setDetails(json)
                 setInputTemp(input.input)

                
                 //set enrollment data into "data"
            })
        })
        
        
        
    }
    const closePopup =()=>{
        setPop(false);
    }
    const ewan=()=>{
        setPop(!popup) 
    }
 

    // const [showModal, setShowModal] = useState(false);

    // const renderBackdrop = (props) => <div className='backdrop'{...props} />;

    // var handleClose = () => setShowModal(false);

    // var handleSuccess = () => {
    //     console.log("success");
    // };

    return(
        
        <div className='with-sidebar'>
            <Sidebar/>
            <div className = 'content-container'>
                <h1>Pending Enrollments</h1>
                <div className='table-container2'>
                    <table cellSpacing={0}>
                         <tr className='table-headers'>
                            <td>Date</td>
                            <td>Time</td>
                            <td>Email</td>
                            <td></td>
                         </tr>

                         {data.map((input,index)=>{//READ DATA of enrollment
                            return(
                                <tr key={index}>   
                                {/* index == how many items to render */}
                                    <td>{input.date}</td>
                                    <td>{input.time}</td>
                                    <td>{input.status}</td>
                                    <td><button className='button2' type="button" onClick={() => handleClickOpen({input})}>View Details</button></td>  
                                </tr>
                            )
                            })}
                    </table>
                    {popup?
                    <div className='main'>
                        <div className='popup'>
                            <div className='popup-header'>
                            <h1>{details[0].email}</h1>
                            
                                <h1 onClick={closePopup}>x</h1>
                            </div>
                            <div className='popup-content'>
                            <p>{details[0].email}</p>
                            <p>{details[0].firstName} {details[0].lastName}</p>
                            <p>{details[1].gender}</p>
                            </div>
                            <button className='button1'>Approve</button>
                        </div>
                    </div>:""}
                </div>
            </div>  
            {/* <Modal
            className='Modal'
            show={showModal}
            onHide={handleClose}
            renderBackdrop={renderBackdrop}
            >
            <div>
                <div className='modal-header'>
                    <div className='modal-title'>Modal Heading</div>
                    <div>
                        <span className='close-button' onClick={handleClose}>x</span>
                    </div>
                </div>
            </div>
            <div className='modal-desc'>
                <p>Modal body contains text.</p>
            </div>
            <div className='modal-footer'>
                <button className='secondary-button' onClick={handleClose}>Close</button>
                <button className='primary-button' onClick={handleSuccess}>Save Changes</button>
            </div>
            </Modal> */}
        </div>

    );

}