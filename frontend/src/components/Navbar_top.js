import '../public/styles/navbar_top.css';
import Logo from '../public/assets/logo.png';
import reactLogo from '../public/assets/logo512.png';

export default function Navbar_top (){
    return (
    <nav className="nav">
        <ul>
            <li>
                <div className='separate'>
                    <div className='left-side-nav'>
                        <img className='company-title' src = {Logo} alt={reactLogo}></img>    
                        <a>About us</a>
                        <a>Lessons</a>
                        <a>Faculty</a>
                        <a>Contact us</a>
                    </div>
                    <div>
                        <a className='user-title'>Student</a>
                    </div>
                </div>   
            </li>
        </ul>
    </nav>  
    );
}