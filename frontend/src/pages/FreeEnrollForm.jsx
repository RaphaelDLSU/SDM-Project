import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState,useEffect,useRef} from 'react';
import axios from 'axios';
import '../public/styles/App.css'
import {decodeToken} from 'react-jwt'
import { useNavigate } from 'react-router-dom'
import Table from '../components/Table';
import { stepClasses } from '@mui/material';


export default function EnrollFormPage() {

    const history=useNavigate()
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
	const [email, setEmail] = useState('')
    const [age,setAge] = useState('')
	const [country,setCountry] = useState('')
	const [gender, setGender] = useState('')
    const [parent, setParent] = useState('')
    const [level, setLevel] = useState('')
    
    const [schedule, setSchedule] = useState('') 

    const [filterInstrument, setFilterInstrument] = useState('')
    const [filterDay, setFilterDay ] = useState('')
    const [preferredClass, setPreferredClass ] = useState([])

    
    const isFirstRender = useRef(true)
    useEffect(() => { //Checks if details has loaded
        if (isFirstRender.current) {
          isFirstRender.current = false // toggle flag after first render/mounting
          return;
        }
        console.log('Details preferred CLsas:'+JSON.stringify(preferredClass))
        
      }, [preferredClass])
      
    useEffect(()=>{
    },[])

    async function enrollUser(event){
        event.preventDefault() 
        console.log('First Name :'+firstName)
        const response = await fetch('http://localhost:3000/enrollfree/enroll',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                firstName,   
                lastName,
                email,
                age,
                country,gender,level,schedule,parent,filterInstrument,filterDay
            })
        })

        if(response.json().status ==='ok'){
            alert('Thank you for registering in a free trial program! We will email you for your confirmationa')
            history('/')
        }
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
    const callback = payload => {

       
        console.log('Callback: ' +JSON.stringify(payload))
        setSchedule(payload._id)
        alert('Selected a schedule!')
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
                                    onChange={(e)=> setEmail(e.target.value)}
                                />
                            </div>   
                            <div className='field'>
                                <p>Country or Residence</p>
                                <input 
                                    type='text'
                                    onChange={(e)=> setCountry(e.target.value)}
                                />
                            </div>
                            <div className='field'>
                                <p>Parent/Guardian Name</p>
                                <input 
                                    type='text'
                                    onChange={(e)=> setParent(e.target.value)}
                                />
                            </div>
                            <br></br>
                            <div className='field'>
                                <p>First Name</p>
                                <input 
                                    type='text'
                                    onChange={(e)=> setFirstName(e.target.value)}
                                />
                            </div>
                            <div className='field'>
                                <p>Gender</p>
                                <input 
                                    type='text'
                                    onChange={(e)=> setGender(e.target.value)}
                                />
                            </div>
                            <div className='field'>
                                <p>Level</p>
                                <input 
                                    type='text'
                                    onChange={(e)=> setLevel(e.target.value)}
                                />
                            </div>
                            <br></br>
                            <div className='field'>
                                <p>Last Name</p>
                                <input 
                                    type='text'
                                    onChange={(e)=> setLastName(e.target.value)}
                                />
                            </div>
                            <div className='field'>
                                <p>Age</p>
                                <input 
                                    type='text'
                                    onChange={(e)=> setAge(e.target.value)}
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
                                <td>        </td>
                            </tr>
                            {preferredClass.map((input,index)=>{//READ DATA of enrollment
                            return(
                                <tr key={index}>
                                    {/* Use new component if you want to render data from two or more tables */}
                                    <Table tableData ={input} url='enrollpending/query' callback={callback} />       
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