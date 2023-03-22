import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import '../public/styles/App.css'
import {decodeToken} from 'react-jwt'
import { useNavigate } from 'react-router-dom'


export default function EnrollFormPage() {

    const history=useNavigate()
	const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
	const [country,setCountry] = useState('')
	const [level, setLevel] = useState('')
    const [numProgram, setNumProgram] = useState('')
    
    const [program, setProgram] = useState([{instrument:"",programName:"",numSessions:""}]) //ARRAY

    useEffect(()=>{ //USEEFFECT = Inital Run ng Page
        const token = localStorage.getItem('token') //Check if there is a user logged in
        console.log(token)
        if (token ==null) {
			localStorage.removeItem('token')
            alert('You cannot browse this. Going back to login...')
			history('/login')
		}
        else  {
            const user = decodeToken(token) //user = email
            console.log(user)
			console.log('User is registered. Given Access')
        }
    },[])

    async function enrollUser(event){
        event.preventDefault() 

        const token = localStorage.getItem('token')
        const user = decodeToken(token)
        const userParsed = user.email
        
        const response = await fetch('http://localhost:3000/enroll',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                age,
                gender,
                country,
                level,
                numProgram,
                program,
                userParsed
            }),
        })
        const data = await response.json()
        if(data.status ==='ok'){
            alert('Enrollment Request Sent. Redirecting to Payment')
            window.location.href = '/payment'
        }    
    }

    const handleFormChange = (e, index)=>{
        
        const { name, value } = e.target
        
        const list = [...program]
        list[index][name] = value
        setProgram(list)
    }

    const programAdd = () => {
        setProgram([...program, {instrument:'',programName:'',numSessions:''}]);
        console.log(program)
      };




    return(

        <div className='with-sidebar'>
            <Sidebar/>
            <form onSubmit={enrollUser} className='form'>
                    <div className='fields'>
                        <h1>Personal Details</h1>
                            <div className='personal'>
                                <div className='field'>
                                    <p>Age</p>
                                    <input 
                                        type='text'
                                        value={age}
                                        onChange={(e)=> setAge(e.target.value)}
                                    />
                                </div>   
                                <div className='field'>
                                    <p>Country or Residence</p>
                                    <input 
                                        type='text'
                                        value={country}
                                        onChange={(e)=> setCountry(e.target.value)}
                                    />
                                </div>
                                <br></br>
                                <div className='field'>
                                    <p>Gender</p>
                                    <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                                        <option disabled selected value>---</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                                
                                <div className='field'>
                                    <p>Level</p>
                                    <select value={level} onChange={(e)=>setLevel(e.target.value)}>
                                        <option disabled selected value>---</option>
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Expert</option>
                                    </select> {/*DROP DOWN*/}
                                </div>
                            </div>
                            
                            <h1>Select Program</h1>
                            <div className='program'>

                                

                                {program.map((input,index)=>{
                                    return(
                                        <div key={index}>
                                            <div className='field'>
                                            
                                            {program.length - 1 === index && program.length < 3 && (
                                                <button
                                                type="button"
                                                onClick={programAdd}
                                                >
                                                <span>Add a Program</span>
                                                </button>
                                            )}
                                            </div>
                                            <div className='field'>
                                                <p>Instrument</p>
                                                <input 
                                                    name='instrument'
                                                    type='text'
                                                    value={input.instrument}
                                                    onChange={(e) => handleFormChange(e, index)}
                                                />
                                            </div>
                                            <br></br>   
                                            <div className='field'>
                                                <p>Program</p>
                                                <input 
                                                    name='programName'
                                                    type='text'
                                                    value={input.programName}
                                                    onChange={(e)=> handleFormChange(e,index)}
                                                />
                                            </div>
                                            <div className='field'>
                                                <p>Number of Sessions</p>
                                                <input 
                                                    name='numSessions'
                                                    type='text'
                                                    value={input.numSessions}
                                                    onChange={(e)=> handleFormChange(e,index)}
                                                />
                                            </div>
                                            
                                        </div>
                                    )
                                })}
                                
                             
                            </div>
                    </div>
                    <div className='summary'>
                        <div className='summary-container'>
                            <div>
                                <h1>Summary</h1>
                                <p>Details: </p>
                                <p>Instrument: </p>
                                <p>Minutes: </p>
                                <p>Sessions: </p>
                                <p>*Might change to Popup*</p><br></br>
                            </div>
                            <div className='summary-bottom'>
                                <p>Total: </p>
                                <input type='submit' value='Proceed' ></input>              
                            </div>             
                        </div> 
                    </div>
                
            </form>
        </div>
         
            
    )

}