
import React,{ useState,useEffect } from 'react'

import '../public/styles/App.css'

export default function FacultyMembers() {

    const [data, setData] = useState([]) //if mapping, turn it into array (useState([])
    

    useEffect(() => { //initialize function
        fetch('http://localhost:3000/facultymembers',{ //get function from home.js (get enrollment data)
            method:'PUT',
        }).then(response => { //response == response is enrollment data
            response.json().then(json=>{ //response needs to be turned into JSON
                setData(json) //set enrollment data into "data"
            })
        })

        console.log('Data: '+data.offer_ID)

    }, [])

    return(
        <div id='aboutUsHeader'>
            <h1>
            Faculty
            </h1>
            <br></br>
            <div className="faculty-container">
                <div className="faculty-card">
                    <img src="john.jpg" alt="John Doe" />
                    <div className="name">John Doe</div>
                    <div className="instrument">Piano</div>
                    <a href="/profiles/john" className="profile-link">View Profile</a>
                </div>
                <div className="faculty-card">
                    <img src="jane.jpg" alt="Jane Smith" />
                    <div className="name">Jane Smith</div>
                    <div className="instrument">Guitar</div>
                    <a href="/profiles/jane" className="profile-link">View Profile</a>
                </div>
                <div className="faculty-card">
                    <img src="bob.jpg" alt="Bob Johnson" />
                    <div className="name">Bob Johnson</div>
                    <div className="instrument">Drums</div>
                    <a href="/profiles/bob" className="profile-link">View Profile</a>
                </div>
                
            </div>

        </div>
            
    );

}