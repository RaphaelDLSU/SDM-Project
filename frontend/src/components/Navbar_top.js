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
                        <a href='/'> <img className='company-title' src = {Logo} alt={reactLogo} ></img>  </a>
                          
                        <a className='navbar-fields' href='/about'>About us</a>
                        <a className='navbar-fields' href='/teacher'>Lessons</a>
                        <a className='navbar-fields' href='/teacher'>Faculty</a>
                        <a className='navbar-fields' href='/teacher'> Contact us</a>
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
