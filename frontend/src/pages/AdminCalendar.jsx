import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar'
import '../public/styles/App.css'
import Popup from '../components/Popup'
import React, { useState,useEffect } from 'react';
import { create } from '@mui/material/styles/createTransitions';
 

  

export default function AdminCalendar() {

    const [isOpen, setIsOpen] = useState(false);
 
    const [eventName, setEventName] = useState('')
    {/* Email == VARIABLE VALUE setEmail == FUNCTION TO SET VALUE OF VARIABLE  */}
	const [eventDate,setEventDate] = useState('')
	const [eventLink, setEventLink] = useState('')
    const [eventParticipant, setEventParticipant] = useState([])
    const [eventJoiners, setEventJoiners] = useState('')
	const [eventStart,setEventStart] = useState('')
    const [eventEnd,setEventEnd] = useState('')

    useEffect(() => { //initialize function
        fetch('http://localhost:3000/getparts',{ //get function from home.js (get enrollment data)
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setEventParticipant(json) //set enrollment data into "data"
            })
        })
        console.log(JSON.stringify(eventParticipant)) 
    }, [])

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

   async function createEvent(event){
        event.preventDefault() 

        const response = await fetch ('http://localhost:3000/createevent',{ // PUPUNTA NA SA BACKEND USING FETCH, URL is same in routes/home.js in router.post('/register')
            method: 'POST', //PARA MAS SPECIFIC
            headers:{
                'Content-Type':'application/json',
            },
            body :JSON.stringify({
                eventJoiners,
                eventName,
                eventDate,
                eventLink,
                eventParticipant,
                eventStart,
                eventEnd
            }), 
        })
        const data = await response.json() //Fetch response

        console.log('Here is data from Create Events '+ data.status) //Data.status == OK
        
        

        }

    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className='content-container'>
                <h1>My Calendar</h1>
                <select className='dateOption'>
                    <option value="March 2023">March 2023</option>
                    <option value="saab"></option>
                </select>
                <div className='calendar-container'>
                    <table bgcolor="white" align="center" 
                        cellspacing="21" cellpadding="21">
                        <caption align="top"></caption>
                        <thead>
                                <tr>
                                    <td>Sun</td>
                                    <td>Mon</td>
                                    <td>Tue</td>
                                    <td>Wed</td>
                                    <td>Thu</td>
                                    <td>Fri</td>
                                    <td>Sat</td>
                                </tr>
                        </thead>
                    
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>1</td>
                                <td>2</td>
                            </tr>
                  
                            <tr>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                                <td>7</td>
                                <td>8</td>
                                <td>9</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>11</td>
                                <td>12</td>
                                <td>13</td>
                                <td>14</td>
                                <td>15</td>
                                <td>16</td>
                            </tr>
                            <tr>
                                <td>17</td>
                                <td>18</td>
                                <td>19</td>
                                <td>20</td>
                                <td>21</td>
                                <td>22</td>
                                <td>23</td>
                            </tr>
                            <tr>
                                <td>24</td>
                                <td>25</td>
                                <td>26</td>
                                <td>27</td>
                                <td>28</td>
                                <td>29</td>
                                <td>30</td>
                            </tr>
                            <tr>
                                <td>31</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <input
            type="button" className='button2'
            value="Schedule"
            onClick={togglePopup}
            />

            {isOpen && <Popup
            content={<>
            <h1>Create Event</h1>
            <form className='form' onSubmit={createEvent}>
           <div className='fields'>
           
                        <div className='eventField'>
                                    <p>Event Name</p>
                                    <input 
                                        type='text' value={eventName}
                                        onChange={(e)=> setEventName(e.target.value)}
                                    />
                                </div> 
                                <div className='eventField'>
                                    <p>Date</p>
                                    <input 
                                    type='date' 
                                    value={eventDate}  
                                    onChange={(e)=> setEventDate(e.target.value)}
                                    />
                                </div> 
                                <div className='eventField'>
                                    <p>Zoom Link</p>
                                    <input 
                                        type='text'
                                        value={eventLink}  
                                    onChange={(e)=> setEventLink(e.target.value)}
                                    />
                                </div> 
                                <div className='eventField'>
                                    <p>Participants</p>
                                    <select name='eventParticipant' 
                                    onChange={(e)=>setEventJoiners(e.target.value)}>
                                    <option disabled selected value> -- select an option -- </option>
                                    {eventParticipant.map((input,index)=>{ 
                                    return(<>
                                        <option value={input.email}>{eventParticipant.firstName} {eventParticipant.lastName}</option>
                                        </>
                                        )
                                    
                                    })}
                                  
                                    </select>
                                </div> 
                                <div className='eventField'>
                                    <p>Event Start</p>
                                    <input 
                                        type='time' 
                                        value={eventStart}  
                                        onChange={(e)=> setEventStart(e.target.value)}
                                    />
                                </div> 
                                <div className='eventField'>
                                    <p>Event End</p>
                                    <input 
                                        type='time' 
                                        value={eventEnd}  
                                        onChange={(e)=> setEventEnd(e.target.value)}
                                    />
                                </div> 
                
                                <button type='submit' style={{marginTop:'15px', padding: '10px'}}>Confirm</button>
            </div>
            
            </form>
            </>}
            handleClose={togglePopup}
             />}
            </div>
        </div>
    )

}