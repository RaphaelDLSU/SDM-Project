import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState,useEffect} from 'react';
import placeholder from '../public/assets/placeholder_person.jpg'
import {decodeToken} from 'react-jwt'
import { set } from 'mongoose';

export default function PaymentPage() {

    const [postImage,setPostImage]= useState({myFile:''})
    const [paymentOption,setPaymentOption]= useState('')
    const [paymentType,setPaymentType]= useState('')



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

    return(
        
        <div className='bbody'>
            <h1>PAYMENT</h1>
            <form onSubmit={handleSubmit}>
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
                    onChange={(e)=>setPaymentType(e.target.value)}>
                    <option disabled selected value> -- select an option -- </option>
                        <option>Full</option>
                        <option>50% Payment</option>
                </select> {/*DROP DOWN*/}
                <h2>3. Transfer this amount: </h2>
                
                

                <label htmlFor="file-upload" className='custom-file-upload'>
                    <img src={postImage.myFile || placeholder} alt="" />
                </label>

                <input 
                    type="file"
                    name="myFile"
                    accept='.jpeg, .png, .jpg'
                    onChange={(e) => handleFileUpload(e)}
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )

}