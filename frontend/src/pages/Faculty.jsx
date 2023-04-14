
import { useNavigate } from 'react-router-dom'
import React from 'react';
import guitar from '../public/assets/Guitar.jpg'
import drums from '../public/assets/Drums.jpg'
import piano from '../public/assets/Piano.jpg'
import violin from '../public/assets/Violin.jpg'
import cello from '../public/assets/Cello.jpg'
import saxophone from '../public/assets/Saxophone.jpg'
import voice from '../public/assets/Voice.jpg'
import ukulele from '../public/assets/Ukulele.jpg'
import flute from '../public/assets/Flute.jpg'
import clarinet from '../public/assets/Clarinet.jpg'

import '../public/assets/logo.png'
import '../public/styles/App.css'

export default function FacultyPage() {

    const navigate = useNavigate()

    return(
        <div id='aboutUsHeader'>
            <h1>
            Faculty
            </h1>
            <br></br>
            <div className="instrument-container">
            {/* <a href="/facultymembers"> */}
                <div className="instrument-card">
                <img onClick={()=>navigate('/facultymembers')} className="instrument-image" src={voice} alt="Voice" />
                <div className="instrument-label">Voice</div>
            </div>
            <div className="instrument-card">
                <img onClick={()=>navigate('/facultymembers')} className="instrument-image" src={piano} alt="Piano" />
                <div className="instrument-label">Piano</div>
            </div>
            {/* <a href="/facultymembers"> */}
                <div className="instrument-card">
                <img onClick={()=>navigate('/facultymembers')} className="instrument-image" src={guitar} alt="Guitar" />
                <div className="instrument-label">Guitar</div>
            </div>
            {/* </a> */}
            {/* <a href="/facultymembers"> */}
            
            <div className="instrument-card">
                <img onClick={()=>navigate('/facultymembers')} className="instrument-image" src={drums} alt="Drums" />
                <div className="instrument-label">Drums</div>
            </div>
            {/* </a> */}
            {/* <a href="/facultymembers"> */}
            <div className="instrument-card">
                <img onClick={()=>navigate('/facultymembers')} className="instrument-image" src={violin} alt="Violin" />
                <div className="instrument-label">Violin</div>
            </div>
            {/* </a> */}
            {/* <a href="/facultymembers">  */}
            <div className="instrument-card">
                <img onClick={()=>navigate('/facultymembers')} className="instrument-image" src={ukulele} alt="Ukulele" />
                <div className="instrument-label">Ukulele</div>
            </div>
            {/* </a> */}
            {/* <a href="/facultymembers"> */}
            <div className="instrument-card">
                <img onClick={()=>navigate('/facultymembers')} className="instrument-image" src={cello} alt="Cello" />
                <div className="instrument-label">Cello</div>
            </div>
            <div className="instrument-card">
                <img onClick={()=>navigate('/facultymembers')} className="instrument-image" src={saxophone} alt="Saxophone" />
                <div className="instrument-label">Saxophone</div>
            </div>
            {/* </a> */}
            <div className="instrument-card">
                <img onClick={()=>navigate('/facultymembers')} className="instrument-image" src={flute} alt="Flute" />
                <div className="instrument-label">Flute</div>
            </div>
            <div className="instrument-card">
                <img onClick={()=>navigate('/facultymembers')} className="instrument-image" src={clarinet} alt="Clarinet" />
                <div className="instrument-label">Clarinet</div>
            </div>

            </div>

        </div>
    );

}