import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState,useEffect} from 'react';
import placeholder from '../public/assets/placeholder_person.jpg'
import {decodeToken} from 'react-jwt'

export default function PaymentPage() {

    const [postImage,setPostImage]= useState({myFile:''})

    



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
                userParsed
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
            <h1>PAYMENT PAGE HERE</h1>
            <form onSubmit={handleSubmit}>

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