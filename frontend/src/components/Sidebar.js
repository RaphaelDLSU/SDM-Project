import React from 'react';
import '../sidebar.css';
import { SidebarData } from './SidebarData';


export default function Sidebar (){
    return (
    <nav className="sidebar">
        <ul className='sidebar_list'>
            {SidebarData.map((val,key)=>{
                return(
                    <li key={key} className='row' onClick={()=>{
                        window.location.pathname = val.link
                    }}>
                        {""}
                        <div className='icon'>{val.icon}</div>
                        <div className='title'>{val.title}</div>

                    </li>

                );
            })}
        </ul>
        
        
        
    </nav>  
    );
}
