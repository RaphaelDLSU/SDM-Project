import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import '../public/styles/App.css'

export default function NotifPage() {
    return(
      <div className='with-sidebar'>
        <Sidebar/>
        
        <div className='notifications-container'>
        <h1>Notifications</h1>  
            <div className='notif-block'>
                <p>Your enrollment on MM/DD/YYYY for Instrument has been confirmed. Please proceed to scheduling your lesson.</p>
            </div>
            <div className='notif-block'>
                <p>Your enrollment on MM/DD/YYYY for Instrument has been confirmed. Please proceed to scheduling your lesson.</p>
            </div>

        </div>
      </div>
    )

}