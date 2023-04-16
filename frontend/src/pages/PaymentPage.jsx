import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState,useEffect,useRef} from 'react';
import placeholder from '../public/assets/placeholder_person.jpg'
import bpi from '../public/assets/bpi.png'
import maya from '../public/assets/maya.png'
import gcash from '../public/assets/gcash.png'
import {decodeToken} from 'react-jwt'
import { set } from 'mongoose';

export default function PaymentPage() {
    const [postImage,setPostImage]= useState({myFile:''})
    const [paymentOption,setPaymentOption]= useState('')
    const [paymentType,setPaymentType]= useState('')
    const [multiplier,setMultiplier]= useState(1)

    const [option,setOption]= useState('')
    const [selected,setSelected]= useState('')
    const [enrollment,setEnrollment]= useState('')

    const [onHold,setOnHold]= useState('')
    const [onEnrollment,setOnEnrollment]= useState(0)

    const token = localStorage.getItem('token')
    const user = decodeToken(token)

    useEffect(() => { 
        fetch('http://localhost:3000/payment/getonhold',{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                user
            })
        }).then(response => { 
            response.json().then(json=>{ 
                setOnHold(json[0])  
                setOnEnrollment(json[1]) 
            })
        })
    }, [])


    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64)
        setPostImage({ ...postImage, myFile : base64 })
      }
    async function handleSubmit (event){
        event.preventDefault()
        
        const token = localStorage.getItem('token')
        const user = decodeToken(token)
        const userParsed = user.email

        const response = await fetch('http://localhost:3000/payment',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postImage,
                userParsed,
                paymentOption,
                paymentType,
            }),
        })

        const data = await response.json()
        if(data.status ==='ok'){
            alert('Payment Image sent. Please wait for confirmation of your enrollment ')
            window.location.href = '/'
        } 

    }
    function convertToBase64(file){
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result)
          };
          fileReader.onerror = (error) => {
            reject(error)
          }
        })
      }
    const handleOptionChange=(e)=>{

        setOption(e)
        
    }
    const isFirstRender = useRef(true)
    useEffect(() => {
        if (isFirstRender.current) {
          isFirstRender.current = false 
          return;
        }
        console.log('Selected: '+selected)
        console.log('Option: '+option)
        fetch('http://localhost:3000/payment/getenrollment',{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                user,selected
            })
        }).then(response => { 
            response.json().then(json=>{ 
                setEnrollment(json)   
            })
        })
    }, [selected])

    async function handleSubmitHalf (){
        console.log('HEREE')
        const token = localStorage.getItem('token')
        const user = decodeToken(token)
        console.log('HEREE')
        const response = await fetch('http://localhost:3000/payment/submithalf',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postImage,
                user,
                paymentOption,
                onHold
            }),
        })

        const data = await response.json()
        if(data.status ==='ok'){
            alert('Payment Image sent. Please wait for confirmation of your enrollment ')
            window.location.href = '/'
        } 


    }
    const handlePaymentType=(e)=>{
        console.log(e)
        setPaymentType(e)
        if(e=='Full')setMultiplier(1)
        else if(e=='50% Payment')setMultiplier(.5)

    }

    return(
        <div className='with-sidebar'>
            <Sidebar/>
        <div id='paymentContainer'>
            <div id='paymentTitle'>
            <h1>Payment  </h1>
            <p>Please check that both account details and amount are correct before confirming payment <select onChange={e=>handleOptionChange(e.target.value)}>
                <option disabled selected value> -- Choose what to pay for -- </option>
                    <option>Enrollment</option>
                    <option>Pay Half</option>
                </select></p>
            </div>

            <div id='paymentOptionsContainer'>
                <div id='paymentOptions'>
                <img src= {bpi}></img>
                <p>Account Name</p>
                <p>Account Number</p>
                    </div>
                <div id='paymentOptions'>
                <img src= {gcash}></img>
                <p>Account Name</p>
                <p>Account Number</p>
                    </div>
                <div id='paymentOptions'>
                <img src= {maya}></img>
                <p>Account Name</p>
                <p>Account Number</p>
                    </div>
            </div>
        
            {option=='Enrollment'&&(
            <form onSubmit={handleSubmit}>
            <div id='paymentDetails'>
                <div id='paymentDetailsContainer'>
                <h2>1. Select Payment Option: </h2>
                <select  
                    name='paymentOption'
                    onChange={(e)=>setPaymentOption(e.target.value)}>
                    <option disabled selected value> -- select an option -- </option>
                        <option>BPI</option>
                        <option>GCash</option>
                        <option>Maya</option>
                </select> {/*DROP DOWN*/}
                 
                <h2>2. Select Payment: </h2>
                <select  
                    name='paymentType'
                    onChange={(e)=>handlePaymentType(e.target.value)}>
                    <option disabled selected value> -- select an option -- </option>
                        <option>Full</option>
                        <option>50% Payment</option>
                </select> {/*DROP DOWN*/}
                <h2>3. Transfer this amount: P{onEnrollment.paymentWhole*multiplier} </h2>
           
                </div>
              
                <div id='paymentDetailsContainer'>

                <h2>4. Upload Proof Of Payment (.png/.jpeg) </h2>

                

                <label htmlFor="file-upload" className='custom-file-upload'>
                    <img src={postImage.myFile || placeholder} alt="" />
                </label>

                <input 
                    type="file"
                    name="myFile"
                    accept='.jpeg, .png, .jpg'
                    onChange={(e) => handleFileUpload(e)}
                />
                
            
                <button type='submit' style={{marginTop:'15px', padding: '10px'}}>Submit</button>
                </div>
                </div>
            
            </form>
            
            )}
            {option=='Pay Half'&&(
                
                <div id='paymentDetails'>
                    <div id='paymentDetailsContainer'>
                    <h2>1.Select Payment Option: </h2>
                    <select  
                        name='paymentOption'
                        onChange={(e)=>setPaymentOption(e.target.value)}>
                        <option disabled selected value> -- select an option -- </option>
                            <option>BPI</option>
                            <option>GCash</option>
                            <option>Maya</option>
                    </select> {/*DROP DOWN*/}
                     
                    
                    <h2>2. Transfer this amount: P{onHold.paymentRemaining} </h2>
               
                    </div>
                  
                    <div id='paymentDetailsContainer'>
    
                    <h2>3. Upload Proof Of Payment (.png/.jpeg) </h2>
    
                    
    
                    <label htmlFor="file-upload" className='custom-file-upload'>
                        <img src={postImage.myFile || placeholder} alt="" />
                    </label>
    
                    <input 
                        type="file"
                        name="myFile"
                        accept='.jpeg, .png, .jpg'
                        onChange={(e) => handleFileUpload(e)}
                    />
                    
                
                    <button className='button2' style={{marginTop:'15px', padding: '10px'}} onClick={handleSubmitHalf}>Submit</button>
                    </div>
                    
                    </div>
                

            )}
            
            </div>
        </div>
    )

}