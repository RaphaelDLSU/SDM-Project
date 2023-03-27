import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';

export default function SchedSumPage() {
    return(
       <div className='with-sidebar'>
        <Sidebar/>
        <div class="schedsum">
        <div>
        <h1>My Schedule</h1>
            <p class="sumheaders">Instrument</p>
            <p class="sumtext">Guitar</p>
            </div>
        <div>
            <p class="sumheaders">Faculty</p>
            <p class="faculty">LastName.FirstName</p>
            </div>
        <div>
            <p class="sumheaders">General Instructions</p>
            <ol class="suminstructions">
                <li>Instruction 1</li>
                <li>Instruction 2</li>
                <li>Instruction 3</li>
            </ol>
        </div>
        <div>
        <p class="sumheaders">Upcoming Sessions</p>
        
        <div className='table-container'>
                    <table cellSpacing={0}>
                        <tr className='table-headers'>
                            <td>Day</td>
                            <td>Date</td>
                            <td>Time</td>
                            <td>Zoom Link</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Monday</td>
                            <td>MM/DD/YYYY</td>
                            <td>HH:MM-HH:MM PHT</td>
                            <td class="link">Click here for the Zoom link</td>
                        </tr>
                        <tr>
                            <td>Wednesday</td>
                            <td>MM/DD/YYYY</td>
                            <td>HH:MM-HH:MM PHT</td>
                            <td class="link">Click here for the Zoom link</td>
                        </tr>
                        <tr>
                            <td>Friday</td>
                            <td>MM/DD/YYYY</td>
                            <td>HH:MM-HH:MM PHT</td>
                            <td class="link">Click here for the Zoom link</td>
                        </tr>
                    </table>
                    </div>
        </div>
        </div>
       </div>
    )

}