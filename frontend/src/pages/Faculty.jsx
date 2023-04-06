
import React from 'react';
import guitar from '../public/assets/Guitar.jpg'
import drums from '../public/assets/Drums.jpg'
import piano from '../public/assets/Piano.jpg'
import violin from '../public/assets/Violin.jpg'
import trumpet from '../public/assets/Trumpet.jpg'
import saxophone from '../public/assets/Saxophone.jpg'

import '../public/assets/logo.png'
import '../public/styles/App.css'

export default function FacultyPage() {

    
    return(
        <div id='aboutUsHeader'>
            <h1>
            Faculty
            </h1>
            <br></br>
            <div className="instrument-container">
            
                <div className="instrument-card">
                <img href="/facultypage"className="instrument-image" src={guitar} alt="Guitar" />
                <div className="instrument-label">Guitar</div>
            </div>
            <div className="instrument-card">
                <img className="instrument-image" src={drums} alt="Drums" />
                <div className="instrument-label">Drums</div>
            </div>
            <div className="instrument-card">
                <img className="instrument-image" src={piano} alt="Piano" />
                <div className="instrument-label">Piano</div>
            </div>
            <div className="instrument-card">
                <img className="instrument-image" src={violin} alt="Violin" />
                <div className="instrument-label">Violin</div>
            </div>
            <div className="instrument-card">
                <img className="instrument-image" src={trumpet} alt="Trumpet" />
                <div className="instrument-label">Trumpet</div>
            </div>
            <div className="instrument-card">
                <img className="instrument-image" src={saxophone} alt="Saxophone" />
                <div className="instrument-label">Saxophone</div>
            </div>
            </div>

        </div>
            
    );

}