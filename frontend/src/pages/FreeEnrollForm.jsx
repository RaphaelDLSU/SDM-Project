import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import '../public/styles/App.css'
import {decodeToken} from 'react-jwt'
import { useNavigate } from 'react-router-dom'


export default function EnrollFormPage() {

    const history=useNavigate()

	const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
	const [country,setCountry] = useState('')
	const [gender, setGender] = useState('')
    const [parent, setParent] = useState('')
    const [level, setLevel] = useState('')

    const [filterInstrument, setFilterInstrument] = useState('')
    const [filterDay, setFilterDay ] = useState('')
    const [preferredClass, setPreferredClass ] = useState([])
    // const [program, setProgram] = useState([{instrument:"",programName:"",numSessions:""}])

    useEffect(()=>{
    },[])

    async function enrollUser(event){
        event.preventDefault() 
    }

    async function handleFilter (event){
        event.preventDefault()

         await fetch('http://localhost:3000/enrollfree/filter',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                filterInstrument,   
                filterDay
            })
        }).then(response =>{
            console.log(response)
            response.json().then(json=>{
                setPreferredClass(json)
            })
        })

    }

    return(

        <div className='with-sidebar'>
            <Sidebar/>
            <form onSubmit={enrollUser} className='form'>
                    <div className='fields-free'>
                    <h1>To begin your 15 minute free trial, we need the following details</h1>

                        <div className='personal'>
                            <div className='field'>
                                <p>Email Address</p>
                                <input 
                                    type='text'

                                    // onChange={(e)=> setAge(e.target.value)}
                                />
                            </div>   
                            <div className='field'>
                                <p>Country or Residence</p>
                                <input 
                                    type='text'
                                    // onChange={(e)=> setCountry(e.target.value)}
                                />
                            </div>
                            <div className='field'>
                                <p>Parent/Guardian Name</p>
                                <input 
                                    type='text'
                                    // onChange={(e)=> setCountry(e.target.value)}
                                />
                            </div>
                            <br></br>
                            <div className='field'>
                                <p>First Name</p>
                                <input 
                                    type='text'
                                    // onChange={(e)=> setCountry(e.target.value)}
                                />
                            </div>
                            <div className='field'>
                                <p>Gender</p>
                                <input 
                                    type='text'
                                    // onChange={(e)=> setCountry(e.target.value)}
                                />
                            </div>
                            <div className='field'>
                                <p>Level</p>
                                <input 
                                    type='text'
                                    // onChange={(e)=> setCountry(e.target.value)}
                                />
                            </div>
                            <br></br>
                            <div className='field'>
                                <p>Last Name</p>
                                <input 
                                    type='text'
                                    // onChange={(e)=> setCountry(e.target.value)}
                                />
                            </div>
                            <div className='field'>
                                <p>Age</p>
                                <input 
                                    type='text'
                                    // onChange={(e)=> setCountry(e.target.value)}
                                />
                            </div>
                        </div>
                        <h1>Trial Class Schedule</h1>
                        <div className='personal'>
                            <div className='field'>
                                <p>Instrument</p>
                                <select  
                                    name='instrument'
                                    onChange={(e)=>setFilterInstrument(e.target.value)}>
                                    <option disabled selected value> -- select an option -- </option>
                                        <option>Voice</option>
                                        <option>Piano</option>
                                        <option>Guitar</option>
                                        <option>Drums</option>
                                        <option>Ukulele</option>
                                        <option>Violin</option>
                                        <option>Cello</option>
                                        <option>Saxophone</option>
                                        <option>Flute</option>      
                                        <option>Clarinet</option>
                                </select> {/*DROP DOWN*/}
                            </div>   
                            <div className='field'>
                                <p>Day</p>
                                <select  
                                    name='instrument'
                                    onChange={(e)=>setFilterDay(e.target.value)}>
                                    <option disabled selected value> -- select an option -- </option>
                                        <option>Monday</option>
                                        <option>Tuesday</option>
                                        <option>Wednesday</option>
                                        <option>Thursday</option>
                                        <option>Friday</option>
                                        <option>Saturday</option>
                                        <option>Sunday</option>
                                </select> {/*DROP DOWN*/}
                            </div>
                            <button onClick={handleFilter}>
                                Filter
                            </button>
                        </div>
                        <div className='table-container'>
                        <table cellSpacing={0}>
                            <tr className='table-headers'>
                                <td>Instrument</td>
                                <td>Day</td>
                                <td>Time</td>
                                <td>Faculty</td>
                                <td></td>
                            </tr>
                            {preferredClass.map((input,index)=>{//READ DATA of enrollment
                            return(
                                <tr key={index}>   
                                {/* index == how many items to render */}
                                    <td>{input.instrument}</td>
                                    <td>{input.days}</td>
                                    <td>????</td>
                                    <td>{input.firstName+' '+input.lastName}</td>
                                    <td>{input.status}</td>
                                </tr>                                
                            )
                                
                            })}
                        </table>
                    </div>     
               
                    </div>
                    
                    
            </form>
        </div>
         
            
    )

}