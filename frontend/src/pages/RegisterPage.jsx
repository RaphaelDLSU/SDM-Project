import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import Logo from '../public/assets/logo.png';
import reactLogo from '../public/assets/logo512.png';
import '../public/styles/App.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
    const history = useNavigate()

	const [email, setEmail] = useState('')
	const [password,setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
	const [lastName,setLastName] = useState('')

    async function registerUser(event){
        event.preventDefault() 

        const response = await fetch ('http://localhost:3000/register',{ // go to register post at routes/home.js
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body :JSON.stringify({
                email,
                password,
                confirmPassword,
                firstName,
                lastName
            }), //put data to be used in routes/home.js register post
        })
        const data = await response.json()

        console.log('Here is data from Register '+ data.status) //Browser Terminal
        

        if(data.status === 'ok'){
            history('/login') //go to page
        }
        
    }
    return(
        <div className='box'>
            <div className='box-content'>
                <form onSubmit={registerUser}>  
                    <img className='company-title' src = {Logo} alt={reactLogo} ></img> 
                    <p>Email</p>
                    <input 
                        type='text'
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                    <p>First Name</p>
                    <input 
                        type='text'
                        value={firstName}
                        onChange={(e)=> setFirstName(e.target.value)}
                    />
                    <p>Last Name</p>
                    <input 
                        type='text'
                        value={lastName}
                        onChange={(e)=> setLastName(e.target.value)}
                    />
                         
                    <p>Password</p> 
                    <input 
                        type='text'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                    <p>Confirm Password</p> 
                    <input 
                        type='text'
                        value={confirmPassword}
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                    />
                    <p>Already have an account?<a href='/login'>Login here</a></p>
                    <input type='submit' value='Register' ></input>
                </form>
            </div>
        </div>
       
    )

}