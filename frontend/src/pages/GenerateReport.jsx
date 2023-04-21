import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState,useEffect,useRef} from 'react';
import axios from 'axios';
import '../public/styles/App.css'
import {decodeToken} from 'react-jwt'
import { useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import moment from 'moment'



export default function GenerateReport() {

    const [instrumentEnrollment, setInstrumentEnrollment] = useState('')
    const [dateEnrollmentStart, setDateEnrollmentStart] = useState('')
    const [dateEnrollmentEnd, setDateEnrollmentEnd] = useState('')
   

    const [instrumentSales, setInstrumentSales] = useState('')
    const [dateSalesStart, setDateSalesStart] = useState('')
    const [dateSalesEnd, setDateSalesEnd] = useState('')

    const [enrollmentSummary, setEnrollmentSummary] = useState([])
    const [enrollmentBody, setEnrollmentBody] = useState([])

    const [salesSummary, setSalesSummary] = useState([])
    const [salesBody, setSalesBody] = useState([])
 

    const getEnrollmentReport=async ()=>{
        await fetch(`http://localhost:3000/generateenrollment`,{ 
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                instrumentEnrollment,dateEnrollmentStart,dateEnrollmentEnd 
            }),
        }).then(response => {
            response.json().then(json=>{ 
                setEnrollmentSummary(json[0])
                setEnrollmentBody(json[1])
            })
        })
    }

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
        } 
        
        console.log('Enrollment Summary: ', enrollmentBody);
        createEnrollmentReport(enrollmentSummary,enrollmentBody)
        window.location.reload()
    }, [enrollmentBody]); 


    const createEnrollmentReport =(summary,body)=>{

        var date = new Date()
        var parsedDate = moment(date).format('LL')
        console.log(parsedDate)

       
        let doc = new jsPDF().setFontSize(12)
        doc.text(80, 10, "Son De Musique International").setFontSize(15)
        doc.text(70, 17, "Enrollment per Instrument Report").setFontSize(12)
        doc.text(80, 25, `${moment(dateEnrollmentStart).format('LL')} to ${moment(dateEnrollmentEnd).format('LL')}`).setFontSize(12)
        doc.line(100,10,100,10)
        autoTable(doc,{
            startY:30,
            head:[['Instrument','Total']],
            body:enrollmentSummary,
            headStyles : { halign : 'center',fillColor:[120,21,72]},
            columnStyles : {0:{halign:'left'},1:{
                halign:'right'
            }},
            theme:'grid'
        })
        autoTable(doc,{
            head:[['Instrument','Email','Name','Enrollment Status','Enrollment Date']],
            body:enrollmentBody,
            headStyles : { halign : 'center',fillColor:[120,21,72]},
            columnStyles:{
                0:{halign:'left'},
                1:{halign:'left'},
                2:{halign:'left'},
                3:{halign:'left'},
                4:{halign:'right'},
              
            },
            theme:'grid'
        })
        doc.save(`Enrollment Per Instrument ${dateEnrollmentStart} - ${dateEnrollmentEnd}.pdf`)

    }

    const getSalesReport=()=>{
        fetch(`http://localhost:3000/generatesalessummary`,{ 
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                instrumentSales,dateSalesStart,dateSalesEnd
            }),
        }).then(response => {
            response.json().then(json=>{ 
                setSalesSummary(json[0])
                setSalesBody(json[1])
            })
        })

    

    }
    const createSalesReport =(summary,body)=>{

        var date = new Date()
        var parsedDate = moment(date).format('LL')
        console.log(parsedDate)

       
        let doc = new jsPDF().setFontSize(12)
        doc.text(80, 10, "Son De Musique International").setFontSize(15)
        doc.text(50, 25, "Earnings per Program Report ").setFontSize(12)
        doc.text(80, 25, `${moment(dateSalesStart).format('LL')} to ${moment(dateSalesEnd).format('LL')}`).setFontSize(12)
        doc.line(100,10,100,10)
        autoTable(doc,{
            startY:30,
            head:[['Program','Selling Price','Number of Enrollees','Total']],
            body:salesSummary,
            headStyles : { halign : 'center',fillColor:[120,21,72]},
            columnStyles : {
                0:{halign:'left'},
                1:{halign:'right'},
                2:{halign:'right'},
                3:{halign:'right'},
                },
            theme:'grid'
        })
        autoTable(doc,{
            head:[['Program','Email','Name','Payment Status','Enrollment Date']],
            body:salesBody,
            headStyles : { halign : 'center',fillColor:[120,21,72]},
            columnStyles:{
                0:{halign:'left'},
                1:{halign:'left'},
                2:{halign:'left'},
                3:{halign:'left'},
                4:{halign:'right'},
              
            },
            theme:'grid'
        })
        doc.save(`Summary of Enrollments per Program Revenue ${dateEnrollmentStart} - ${dateEnrollmentEnd}.pdf`)

    }
    const isFirstRender2 = useRef(true);
    useEffect(() => {
        if (isFirstRender2.current) {
        isFirstRender2.current = false;
        return;
        } 
        
        createSalesReport(salesBody,salesSummary)
        window.location.reload()
    }, [salesSummary]); 
    return(
        <div className='with-sidebar'>
            <Sidebar/>
            <div className='fields'>
                <h1>Generate Reports</h1>    
                <h3>Enrollment &nbsp; &nbsp; &nbsp;<button onClick={getEnrollmentReport} className='button1'>Generate</button></h3>    
                <div className='field'>
                    <p>Instrument  <select  
                        onChange={(e)=>setInstrumentEnrollment(e.target.value)}>
                        <option disabled selected value> -- select an option -- </option>
                            <option>Voice</option>
                            <option>Piano</option>
                            <option>Guitar</option>
                            <option>Drums</option>
                            <option>Ukulele</option>
                            <option>Violin</option>
                            <option>Cello</option>
                            <option>Saxophone</option>
                            <option>Flute</option>
                            <option>Clarinet</option>
                    </select>
                    </p>
                   
                </div>
                <div className='field'>
                    <p>Start <input type='date'
                    onChange={(e)=>setDateEnrollmentStart(e.target.value)}>
                    </input>
                    </p>
                    
                </div>
                <div className='field'>
                    <p>End  <input type='date'
                    onChange={(e)=>setDateEnrollmentEnd(e.target.value)}>
                    </input>
                    </p>
                   
                </div>
               <br></br><br></br>
                <h3>Sales  &nbsp; &nbsp; &nbsp;<button onClick={getSalesReport} className='button1'>Generate</button></h3>    
                <div className='field'>
                    <p>Instrument  <select  
                        onChange={(e)=>setInstrumentSales(e.target.value)}>
                        <option disabled selected value> -- select an option -- </option>
                            <option>Voice</option>
                            <option>Piano</option>
                            <option>Guitar</option>
                            <option>Drums</option>
                            <option>Ukulele</option>
                            <option>Violin</option>
                            <option>Cello</option>
                            <option>Saxophone</option>
                            <option>Flute</option>
                            <option>Clarinet</option>
                    </select>
                    </p>
                   
                </div>
                <div className='field'>
                    <p>Start <input type='date'
                    onChange={(e)=>setDateSalesStart(e.target.value)}>
                    </input>
                    </p>
                    
                </div>
                <div className='field'>
                    <p>End  <input type='date'
                    onChange={(e)=>setDateSalesEnd(e.target.value)}>
                    </input>
                    </p>
                   
                </div>
                                
        </div>  
    </div>         
    )

}