import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import Logo from '../public/assets/logo.png'
import reactLogo from '../public/assets/logo512.png'

export default function LoginPage() {
    return(
        <div className='box'>
           <img className='company-title' src = {Logo} alt={reactLogo}></img> 
        </div>
    )

}