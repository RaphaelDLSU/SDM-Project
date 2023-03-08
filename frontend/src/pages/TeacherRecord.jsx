import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';

export default function TeacherPage() {
    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className = 'content-container'>
                <h1>Pepito, Franz</h1>
                <div className='table-container2'>
                    <table cellSpacing={0}>
                         <tr className='table-headers'>
                            <td>Schedule</td>
                         </tr>
                         <tr className='table-headers2'>
                            <td>Day/s</td>
                            <td>Program</td>
                            <td>Time</td>
                            <td>Status</td>
                            <td>Student Enrolled</td>
                         </tr>
                         <tr>
                            <td>MW</td>
                            <td>1 Hour</td>
                            <td>HH:MM - HH:MM PHT</td>
                            <td>Occupied</td>
                            <td>First Name, Last Name</td>
                         </tr>
                    </table>
                </div>
                <div className='table-container2'>
                        <table cellSpacing={0}>
                        <tr className='table-headers'>
                            <td>Sessions</td>
                         </tr>
                         <tr className='table-headers2'>
                            <td>Number</td>
                            <td>Day</td>
                            <td>Date</td>
                            <td>Time</td>
                            <td>Student Attendance</td>
                         </tr>
                         <tr>
                            <td>1</td>
                            <td>Monday</td>
                            <td>MM/DD/YYYY</td>
                            <td>HH:MM - HH:MM PHT</td>
                            <td>Present</td>
                         </tr>
                        </table>
                    </div>
            </div>
        </div>
    )

}