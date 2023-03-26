import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{ useState,useEffect } from 'react'
import Modal from 'react-overlays/Modal';
import { List } from '@mui/material';
import '../public/styles/App.css'

export default function EnrollPending() {

    const [data, setData] = useState([]) //if mapping, turn it into array (useState([]))

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

    const [showModal, setShowModal] = useState(false);

    const renderBackdrop = (props) => <div className='backdrop'{...props} />;

    var handleClose = () => setShowModal(false);

    var handleSuccess = () => {
        console.log("success");
    };

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
                                    <td>{input.offer_ID}</td>
                                    <td>{input.instrument}</td>
                                    <td>{input.status}</td>
                                    <td><button className='button2' type="button" onClick={() => setShowModal(true)}>View Details</button></td>  
                                </tr>
                                
                            )
                                
                            })}
                    </table>
                </div>
            </div>  
            <Modal
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
            </Modal>
        </div>

    );

}

// export default function Modal() {
//     const [modal, setModal] = useState(false);

//     const toggleModal = () => {
//         setModal(!modal)
//     }

//     return (
//         <>
//         <button
//             onClick={toggleModal}
//             className="button2">
//         Open
//         </button>
//         <div className="modal">
//             <div className="overlay">
//                 <div className="modal-content">
//                     <h2>testetetettst</h2>
//                     <p>tetststststst</p>
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }