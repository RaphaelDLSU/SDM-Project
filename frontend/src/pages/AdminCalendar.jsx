import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import '../public/styles/App.css'

export default function AdminCalendar() {
    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className='content-container'>
                <h1>My Calendar</h1>
                <h2>Please select an enrollment to schedule</h2>
                <div className='table-container'>
                    <table cellSpacing={0}>

                        <thead>
                                <tr>
                                    <td>Sun</td>
                                    <th>Mon</th>
                                    <th>Tue</th>
                                    <th>Wed</th>
                                    <th>Thu</th>
                                    <th>Fri</th>
                                    <td>Sat</td>
                                </tr>
                        </thead>
                    
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>1</td>
                                <td>2</td>
                            </tr>
                            <tr></tr>
                            <tr>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                                <td>7</td>
                                <td>8</td>
                                <td>9</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>11</td>
                                <td>12</td>
                                <td>13</td>
                                <td>14</td>
                                <td>15</td>
                                <td>16</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}