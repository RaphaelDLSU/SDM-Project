import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';

export default function StudentRecord() {
    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className = 'content-container'>
                <h1>Student Records</h1>
                <div className='table-container2'>
                    <table cellSpacing={0}>
                         <tr className='table-headers'>
                            <td>Schedule</td>
                         </tr>
                         <tr className='table-headers2'>
                            <td>Last Name</td>
                            <td>First Name</td>
                            <td>Enrollment Status</td>
                            <td>Email</td>
                            <td></td>
                         </tr>
                         <tr>
                            <td>De La Cruz</td>
                            <td>Juan</td>
                            <td>Enrolled</td>
                            <td>juan_delacruz@gmail.com</td>
                            <td><button className='button2'>View Record</button></td>
                         </tr>
                    </table>
                </div>
            </div>
        </div>
    )

}