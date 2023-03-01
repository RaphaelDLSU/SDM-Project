import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import Logo from '../public/assets/logo.png';
import reactLogo from '../public/assets/logo512.png';
import '../public/styles/App.css';

export default function LoginPage() {
    return(
        <div className='box'>
            <div className='box-content'>
                <form method='POST'>
                    <img className='company-title' src = {Logo} alt={reactLogo} ></img> 
                    <p>Email</p><input type='text'></input>
                    <p>Password</p> <input type='text'></input>
                    <p>Confirm Password</p> <input type='text'></input>
                    <p>Already have an account?<a href='/login'>Login here</a></p>
                    <input type='submit' value='Register'></input>
                </form>
            </div>
        </div>
       
    )

}