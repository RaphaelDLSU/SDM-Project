import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import Logo from '../public/assets/logo.png';
import reactLogo from '../public/assets/logo512.png';
import '../public/styles/App.css';
import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

export default function LoginPage() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    async function loginUser(event){
        event.preventDefault()

        const response = await fetch('http://localhost:3000/login',{
            method: 'POST',
            headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
        })
        const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user) //Store Token for authentication
			alert('Login successful')
			window.location.href = '/'
		} else {
			alert('Please check your username and password')
		}
    }

   
    return(
        <div className='box'>
            <div className='box-content'>
                <form onSubmit={loginUser}>
                <img className='company-title' src = {Logo} alt={reactLogo} ></img> 
                <p>Email</p><input type='text' value={email} onChange={(e)=> setEmail(e.target.value)}  ></input>
                <p>Password</p> <input type='text' value={password} onChange={(e)=> setPassword(e.target.value)}  ></input>
                <p>No account? <a href='/register'>Enroll now!</a></p>
                <input type='submit' value='Login'></input>
                </form>
            </div>
        </div>
       
    )

}