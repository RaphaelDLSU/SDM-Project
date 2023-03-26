import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';

export default function FreeTrialPending() {
    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className = 'content-container'>
                <h1>Free Trial</h1>
                <div className='table-container2'>
                    <table cellSpacing={0}>
                         <tr className='table-headers'>
                            <td>Date</td>
                            <td>Time</td>
                            <td>Email</td>
                            <td></td>
                         </tr>
                         <tr>
                            <td>MM/DD/YYYY</td>
                            <td>HH:MM - HH:MM PHT</td>
                            <td>juan_delacruz@gmail.com</td>
                            <td><button className='button2'>View Details</button></td>
                         </tr>
                    </table>
                </div>
            </div>
        </div>
    )

}