import '../public/styles/navbar_top.css';
import Logo from '../public/assets/logo.png';
import reactLogo from '../public/assets/logo512.png';
import {decodeToken} from 'react-jwt'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'

export default function Navbar_top (){

    const navigate = useNavigate()
    const token = localStorage.getItem('token') //Get user email that is logged in RN
    const user = decodeToken(token) 
    
    const logout =()=>{
        let confirmAction = window.confirm('Are you sure you want to logout?')

        if(confirmAction){
            localStorage.removeItem('token')
            navigate('/login')
        }
    }
    return (
    <nav className="nav">
        <ul>
            <li>
                <div className='separate'>
                    <div className='left-side-nav'>
                        <a href='/'> <img className='company-title' src = {Logo} alt={reactLogo} ></img>  </a>
                          
                        <a className='navbar-fields' href='/about'>About us</a>
                       
                        <a className='navbar-fields' href='/facultypage'>Faculty</a>
                        <a className='navbar-fields' href='/contactus'> Contact us</a>
                        
                    </div>
                    <div className='right-side-nav'>
                    {user===null&&(
                        <a><button onClick={()=>navigate('/login')} className='button1'>Log in</button> <button onClick={()=>navigate('/register')} className='button2'>Sign in</button></a>
                    )}
                    {user!= null &&(
                         <a className='user-title'>{user.firstName} {user.lastName} &nbsp;      <a className='logout' onClick={logout}><LogoutIcon style={{fontSize:25}}/></a></a>
                    )}
                       
                    </div>
                </div>   
            </li>
        </ul>
    </nav>  
    );
}
