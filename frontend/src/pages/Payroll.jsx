import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';

export default function PayrollPage() {
    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className = 'content-container'>
                <h1>Payroll</h1>
                <div className='table-container2'>
                    <table cellSpacing={0}>
                         <tr className='table-headers'>
                            <td>Faculty</td>
                         </tr>
                         <tr className='table-headers2'>
                            <td>Last Name</td>
                            <td>First Name</td>
                            <td>Instrument</td>
                            <td>Salary Date</td>
                            <td>Payment Option</td>
                            <td>Status</td>
                            <td></td>
                         </tr>
                         <tr>
                            <td>Pepito</td>
                            <td>Franz</td>
                            <td>Guitar</td>
                            <td>11/15/2022</td>
                            <td>BPI</td>
                            <td>Not Adjusted</td>
                            <td><button className='button2'>View History</button></td>
                         </tr>
                    </table>
                </div>
            </div>
        </div>
    )

}