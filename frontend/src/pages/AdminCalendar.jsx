import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import '../public/styles/App.css'

export default function AdminCalendar() {
    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className='content-container'>
                <h1>My Calendar</h1>
                <select className='dateOption'>
                    <option value="March 2023">March 2023</option>
                    <option value="saab"></option>
                </select>
                <div className='calendar-container'>
                    <table bgcolor="beige" align="center" 
                        cellspacing="21" cellpadding="21">
                        <caption align="top"></caption>
                        <thead>
                                <tr>
                                    <td>Sun</td>
                                    <td>Mon</td>
                                    <td>Tue</td>
                                    <td>Wed</td>
                                    <td>Thu</td>
                                    <td>Fri</td>
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
                            <tr>
                                <td>17</td>
                                <td>18</td>
                                <td>19</td>
                                <td>20</td>
                                <td>21</td>
                                <td>22</td>
                                <td>23</td>
                            </tr>
                            <tr>
                                <td>24</td>
                                <td>25</td>
                                <td>26</td>
                                <td>27</td>
                                <td>28</td>
                                <td>29</td>
                                <td>30</td>
                            </tr>
                            <tr>
                                <td>31</td>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}