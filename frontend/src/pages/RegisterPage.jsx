import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import Logo from '../public/assets/logo.png';
import reactLogo from '../public/assets/logo512.png';
import '../public/styles/App.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {


    const history = useNavigate() //Set History here

    // VARIABLES BEING PASSED ONTO BACKEND AND FRONTEND
	const [email, setEmail] = useState('')
    {/* Email == VARIABLE VALUE setEmail == FUNCTION TO SET VALUE OF VARIABLE  */}
	const [password,setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
	const [lastName,setLastName] = useState('')

    async function registerUser(event){
        event.preventDefault() 

        const response = await fetch ('http://localhost:3000/register',{ // PUPUNTA NA SA BACKEND USING FETCH, URL is same in routes/home.js in router.post('/register')
            method: 'POST', //PARA MAS SPECIFIC
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
        const data = await response.json() //Fetch response

        console.log('Here is data from Register '+ data.status) //Data.status == OK
        

        if(data.status === 'ok'){ //If I am registered
            history('/login') // History (Function ng react sa frontend na naglilipat ng page)
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
                        value={email} //Points to the variable value
                        onChange={(e)=> setEmail(e.target.value)} // Kada type - iniiba email using setEmail Function
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