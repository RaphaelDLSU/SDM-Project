import React from 'react';
import '../public/styles/sidebar.css';
import { SidebarData } from './SidebarData';
import {decodeToken} from 'react-jwt'



export default function Sidebar (){

    const token = localStorage.getItem('token')
    const user = decodeToken(token) 
    return ( 

        <>
        {user &&(
        <nav className="sidebar">
           
                <ul className='sidebar_list'>
                
                {SidebarData.map((val,key)=>{
                    return(
                        
                        <>
                        {user.type===val.type&&(
                        <li key={key} className='row' onClick={()=>{
                            window.location.pathname = val.link
                        }}>
                                    <div className='icon'>{val.icon}</div>
                                    <div className='title'>{val.title}</div>
                        </li>
                        )}
                        </>

                    );
                })}
            </ul>

            
            
        
        
        
        </nav>  
        )}
        </>
    );
}
