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
    const [numProgram, setNumProgram] = useState(0)
    
    const [program, setProgram] = useState([{instrument:"",programName:"",numSessions:""}]) 
    const [selected, setSelected] = useState('');//ARRAY
    const [selected1, setSelected1] = useState('');//ARRAY
    const [selected2, setSelected2] = useState('');//ARRAY

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

        const token = localStorage.getItem('token') //Get user email that is logged in RN
        const user = decodeToken(token) 
        const userParsed = user.email // User Email mismo
        console.log('Program :'+JSON.stringify(program))
        const response = await fetch('http://localhost:3000/enroll',{
            method:'POST',
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
        console.log('E :'+e)
        
        const { name, value } = e.target
        
        const list = [...program]
        list[index][name] = value
        console.log('List :'+JSON.stringify(program))
        setProgram(list)
    }

    const programAdd = () => {
        setProgram([...program, {instrument:'',programName:'',numSessions:''}]);
        setNumProgram(numProgram+1)
        console.log(program)
      };

      /** Different arrays for different dropdowns */

      const thiryMin = [9, 12, 20];
      const oneHour = [ 4, 8, 12, 20];
      
      /** Type variable to store different array for different dropdown */
      let type = null;
      let type1 = null;
      let type2 = null;
      
      /** This will be used to create set of options that user will see */
      let options = null;
      let options1 = null;
      let options2 = null;
      
      /** Setting Type variable according to dropdown */
      if (selected === "1 hour") {
        type = oneHour;
      } else if (selected === "30 min") {
        type = thiryMin;
      }
      if (type) {
        options = type.map((el) => <option key={el}>{el}</option>);
      }
      if (selected1 === "1 hour") {
        type1 = oneHour;
      } else if (selected1 === "30 min") {
        type1 = thiryMin;
      }
      if (type1) {
        options1 = type1.map((el) => <option key={el}>{el}</option>);
      }

      if (selected2 === "1 hour") {
        type2 = oneHour;
      } else if (selected2 === "30 min") {
        type2 = thiryMin;
      }
      if (type2) {
        options2 = type2.map((el) => <option key={el}>{el}</option>);
      }


      const changeDropdown =(e,index)=>{
        handleFormChange(e,index)
        if(index ==0)
            setSelected(e.target.value)
        else if(index ==1)
            setSelected1(e.target.value)
        else if(index ==2)
            setSelected2(e.target.value)
      }


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
                                        onChange={(e)=> setAge(e.target.value)}
                                    />
                                </div>   
                                <div className='field'>
                                    <p>Country or Residence</p>
                                    <input 
                                        type='text'
                                        onChange={(e)=> setCountry(e.target.value)}
                                    />
                                </div>
                                <br></br>
                                <div className='field'>
                                    <p>Gender</p>
                                    <select  onChange={(e)=>setGender(e.target.value)}>
                                    <option disabled selected value> -- select an option -- </option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                                
                                <div className='field'>
                                    <p>Level</p>
                                    <select  onChange={(e)=>setLevel(e.target.value)}>
                                    <option disabled selected value> -- select an option -- </option>
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
                                            
                                            {program.length - 1 === index && program.length < 3 && ( // IF ELSE SA FRONTEND (only appears if program <3)
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
                                                <select  
                                                    name='instrument'
                                                    onChange={(e)=>handleFormChange(e,index)}>
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
                                            <br></br>   
                                            <div className='field'>
                                                <p>Program</p>
                                                <select  
                                                    name='programName'
                                                    onChange={(e)=>{changeDropdown(e,index)}}>
                                                    <option disabled selected value> -- select an option -- </option>
                                                        <option>1 hour</option>
                                                        <option>30 min</option>
                                                </select> {/*DROP DOWN (might change to checkbox)*/}
                                            </div>
                                            
                                            <div className='field'> 
                                                <p>Number of Sessions</p>
                                                {index==0 &&(
                                                    <select  name='numSessions' onChange={(e)=>handleFormChange(e,index)}>{options}</select>
                                                )}
                                                {index==1 &&(
                                                    <select name='numSessions' onChange={(e)=>handleFormChange(e,index)}>{options1}</select>
                                                )}
                                                 {index==2 &&(
                                                    <select name='numSessions' onChange={(e)=>handleFormChange(e,index)}>{options2}</select>
                                                )}
                                                
                                                
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