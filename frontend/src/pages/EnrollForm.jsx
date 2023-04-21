import Navbar from '../components/Navbar_top'
import Sidebar from '../components/Sidebar';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import '../public/styles/App.css'
import {decodeToken} from 'react-jwt'
import { useNavigate } from 'react-router-dom'


export default function EnrollFormPage() {

    const history=useNavigate()
	const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
	const [country,setCountry] = useState('')
	const [level, setLevel] = useState('')
    const [numProgram, setNumProgram] = useState(0)
    
    const [program, setProgram] = useState([{instrument:"",programName:"",numSessions:""}]) 
    const [selected, setSelected] = useState('');//ARRAY
    const [selected1, setSelected1] = useState('');//ARRAY
    const [selected2, setSelected2] = useState('');//ARRAY

    useEffect(()=>{ //USEEFFECT = Inital Run ng Page
        const token = localStorage.getItem('token') //Check if there is a user logged in
        console.log(token)
        if (token ==null) {
			localStorage.removeItem('token')
            alert('You cannot browse this. Going back to login...')
			history('/login')
		}
        else  {
            const user = decodeToken(token) //user = email
            console.log(user)
			console.log('User is registered. Given Access')
        }
    },[])

    async function enrollUser(event){
        event.preventDefault() 

        const token = localStorage.getItem('token') //Get user email that is logged in RN
        const user = decodeToken(token) 
        const userParsed = user.email // User Email mismo
        console.log('Program :'+JSON.stringify(program))
        const response = await fetch('http://localhost:3000/enroll',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                age,
                gender,
                country,
                level,
                numProgram,
                program,
                userParsed
            }),
        })
        const data = await response.json()
        if(data.status ==='ok'){
            alert('Enrollment Request Sent. Redirecting to Payment')
            window.location.href = '/payment'
        }    
    }

    const handleFormChange = (e, index)=>{
        console.log('E :'+e)
        
        const { name, value } = e.target
        
        const list = [...program]
        list[index][name] = value
        console.log('List :'+JSON.stringify(program))
        setProgram(list)
    }

    const programAdd = () => {
        setProgram([...program, {instrument:'',programName:'',numSessions:''}]);
        setNumProgram(numProgram+1)
        console.log(program)
      };
    const programRemove = () => {
        setProgram(program.slice(0, -1));
      };

      /** Different arrays for different dropdowns */

      const thiryMin = [9, 12, 20];
      const oneHour = [ 4, 8, 12, 20];
      
      /** Type variable to store different array for different dropdown */
      let type = null;
      let type1 = null;
      let type2 = null;
      
      /** This will be used to create set of options that user will see */
      let options = null;
      let options1 = null;
      let options2 = null;
      
      /** Setting Type variable according to dropdown */
      if (selected === "1 hour") {
        type = oneHour;
      } else if (selected === "30 min") {
        type = thiryMin;
      }
      if (type) {
        options = type.map((el) => <option key={el}>{el}</option>);
      }
      if (selected1 === "1 hour") {
        type1 = oneHour;
      } else if (selected1 === "30 min") {
        type1 = thiryMin;
      }
      if (type1) {
        options1 = type1.map((el) => <option key={el}>{el}</option>);
      }

      if (selected2 === "1 hour") {
        type2 = oneHour;
      } else if (selected2 === "30 min") {
        type2 = thiryMin;
      }
      if (type2) {
        options2 = type2.map((el) => <option key={el}>{el}</option>);
      }


      const changeDropdown =(e,index)=>{
        handleFormChange(e,index)
        if(index ==0)
            setSelected(e.target.value)
        else if(index ==1)
            setSelected1(e.target.value)
        else if(index ==2)
            setSelected2(e.target.value)
      }


    return(

        <div className='with-sidebar'>
            <Sidebar/>
            <form onSubmit={enrollUser} className='form'>
                    <div className='fields'>
                        <h1 id='personal-details-header'>Personal Details &nbsp;&nbsp;&nbsp;&nbsp; <input type='submit' className='button1' value='Proceed' ></input></h1>
                            <div className='personal'>
                                <div className='field'>
                                    <p>Age</p>
                                    <input 
                                        type='number'
                                        onChange={(e)=> setAge(e.target.value)}
                                        min="1"
                                    />
                                </div>   
                                <div className='field'>
                                    <p>Country or Residence</p>
                                <select onChange={(e)=>setCountry(e.target.value)}>
                                    <option disabled selected value> -- select an option -- </option>
                                    
                                    <option value="Afghanistan">Afghanistan</option>
                                    <option value="Aland Islands">Aland Islands</option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="American Samoa">American Samoa</option>
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Anguilla">Anguilla</option>
                                    <option value="Antarctica">Antarctica</option>
                                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Aruba">Aruba</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaijan">Azerbaijan</option>
                                    <option value="Bahamas">Bahamas</option>
                                    <option value="Bahrain">Bahrain</option>
                                    <option value="Bangladesh">Bangladesh</option>
                                    <option value="Barbados">Barbados</option>
                                    <option value="Belarus">Belarus</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Belize">Belize</option>
                                    <option value="Benin">Benin</option>
                                    <option value="Bermuda">Bermuda</option>
                                    <option value="Bhutan">Bhutan</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>
                                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                    <option value="Botswana">Botswana</option>
                                    <option value="Bouvet Island">Bouvet Island</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                                    <option value="Bulgaria">Bulgaria</option>
                                    <option value="Burkina Faso">Burkina Faso</option>
                                    <option value="Burundi">Burundi</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="Cameroon">Cameroon</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Cape Verde">Cape Verde</option>
                                    <option value="Cayman Islands">Cayman Islands</option>
                                    <option value="Central African Republic">Central African Republic</option>
                                    <option value="Chad">Chad</option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Christmas Island">Christmas Island</option>
                                    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Comoros">Comoros</option>
                                    <option value="Congo">Congo</option>
                                    <option value="Congo, Democratic Republic of the Congo">Congo, Democratic Republic of the Congo</option>
                                    <option value="Cook Islands">Cook Islands</option>
                                    <option value="Costa Rica">Costa Rica</option>
                                    <option value="Cote D'Ivoire">Cote D'Ivoire</option>
                                    <option value="Croatia">Croatia</option>
                                    <option value="Cuba">Cuba</option>
                                    <option value="Curacao">Curacao</option>
                                    <option value="Cyprus">Cyprus</option>
                                    <option value="Czech Republic">Czech Republic</option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="Djibouti">Djibouti</option>
                                    <option value="Dominica">Dominica</option>
                                    <option value="Dominican Republic">Dominican Republic</option>
                                    <option value="Ecuador">Ecuador</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="El Salvador">El Salvador</option>
                                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                                    <option value="Eritrea">Eritrea</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Ethiopia">Ethiopia</option>
                                    <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                    <option value="Faroe Islands">Faroe Islands</option>
                                    <option value="Fiji">Fiji</option>
                                    <option value="Finland">Finland</option>
                                    <option value="France">France</option>
                                    <option value="French Guiana">French Guiana</option>
                                    <option value="French Polynesia">French Polynesia</option>
                                    <option value="French Southern Territories">French Southern Territories</option>
                                    <option value="Gabon">Gabon</option>
                                    <option value="Gambia">Gambia</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Gibraltar">Gibraltar</option>
                                    <option value="Greece">Greece</option>
                                    <option value="Greenland">Greenland</option>
                                    <option value="Grenada">Grenada</option>
                                    <option value="Guadeloupe">Guadeloupe</option>
                                    <option value="Guam">Guam</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Guernsey">Guernsey</option>
                                    <option value="Guinea">Guinea</option>
                                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                                    <option value="Guyana">Guyana</option>
                                    <option value="Haiti">Haiti</option>
                                    <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                                    <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                    <option value="Honduras">Honduras</option>
                                    <option value="Hong Kong">Hong Kong</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Iceland">Iceland</option>
                                    <option value="India">India</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                                    <option value="Iraq">Iraq</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Isle of Man">Isle of Man</option>
                                    <option value="Israel">Israel</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Jamaica">Jamaica</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Jersey">Jersey</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Kazakhstan">Kazakhstan</option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="Kiribati">Kiribati</option>
                                    <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                                    <option value="Korea, Republic of">Korea, Republic of</option>
                                    <option value="Kosovo">Kosovo</option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                                    <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                    <option value="Latvia">Latvia</option>
                                    <option value="Lebanon">Lebanon</option>
                                    <option value="Lesotho">Lesotho</option>
                                    <option value="Liberia">Liberia</option>
                                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                    <option value="Liechtenstein">Liechtenstein</option>
                                    <option value="Lithuania">Lithuania</option>
                                    <option value="Luxembourg">Luxembourg</option>
                                    <option value="Macao">Macao</option>
                                    <option value="Macedonia, the Former Yugoslav Republic of">Macedonia, the Former Yugoslav Republic of</option>
                                    <option value="Madagascar">Madagascar</option>
                                    <option value="Malawi">Malawi</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Maldives">Maldives</option>
                                    <option value="Mali">Mali</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Marshall Islands">Marshall Islands</option>
                                    <option value="Martinique">Martinique</option>
                                    <option value="Mauritania">Mauritania</option>
                                    <option value="Mauritius">Mauritius</option>
                                    <option value="Mayotte">Mayotte</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                    <option value="Moldova, Republic of">Moldova, Republic of</option>
                                    <option value="Monaco">Monaco</option>
                                    <option value="Mongolia">Mongolia</option>
                                    <option value="Montenegro">Montenegro</option>
                                    <option value="Montserrat">Montserrat</option>
                                    <option value="Morocco">Morocco</option>
                                    <option value="Mozambique">Mozambique</option>
                                    <option value="Myanmar">Myanmar</option>
                                    <option value="Namibia">Namibia</option>
                                    <option value="Nauru">Nauru</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Netherlands">Netherlands</option>
                                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                                    <option value="New Caledonia">New Caledonia</option>
                                    <option value="New Zealand">New Zealand</option>
                                    <option value="Nicaragua">Nicaragua</option>
                                    <option value="Niger">Niger</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Niue">Niue</option>
                                    <option value="Norfolk Island">Norfolk Island</option>
                                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                    <option value="Norway">Norway</option>
                                    <option value="Oman">Oman</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="Palau">Palau</option>
                                    <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                    <option value="Panama">Panama</option>
                                    <option value="Papua New Guinea">Papua New Guinea</option>
                                    <option value="Paraguay">Paraguay</option>
                                    <option value="Peru">Peru</option>
                                    <option value="Philippines">Philippines</option>
                                    <option value="Pitcairn">Pitcairn</option>
                                    <option value="Poland">Poland</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Puerto Rico">Puerto Rico</option>
                                    <option value="Qatar">Qatar</option>
                                    <option value="Reunion">Reunion</option>
                                    <option value="Romania">Romania</option>
                                    <option value="Russian Federation">Russian Federation</option>
                                    <option value="Rwanda">Rwanda</option>
                                    <option value="Saint Barthelemy">Saint Barthelemy</option>
                                    <option value="Saint Helena">Saint Helena</option>
                                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                    <option value="Saint Lucia">Saint Lucia</option>
                                    <option value="Saint Martin">Saint Martin</option>
                                    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                    <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                                    <option value="Samoa">Samoa</option>
                                    <option value="San Marino">San Marino</option>
                                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                    <option value="Senegal">Senegal</option>
                                    <option value="Serbia">Serbia</option>
                                    <option value="Serbia and Montenegro">Serbia and Montenegro</option>
                                    <option value="Seychelles">Seychelles</option>
                                    <option value="Sierra Leone">Sierra Leone</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Sint Maarten">Sint Maarten</option>
                                    <option value="Slovakia">Slovakia</option>
                                    <option value="Slovenia">Slovenia</option>
                                    <option value="Solomon Islands">Solomon Islands</option>
                                    <option value="Somalia">Somalia</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
                                    <option value="South Sudan">South Sudan</option>
                                    <option value="Spain">Spain</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                    <option value="Sudan">Sudan</option>
                                    <option value="Suriname">Suriname</option>
                                    <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                    <option value="Swaziland">Swaziland</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                    <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                                    <option value="Tajikistan">Tajikistan</option>
                                    <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                    <option value="Thailand">Thailand</option>
                                    <option value="Timor-Leste">Timor-Leste</option>
                                    <option value="Togo">Togo</option>
                                    <option value="Tokelau">Tokelau</option>
                                    <option value="Tonga">Tonga</option>
                                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                    <option value="Tunisia">Tunisia</option>
                                    <option value="Turkey">Turkey</option>
                                    <option value="Turkmenistan">Turkmenistan</option>
                                    <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                    <option value="Tuvalu">Tuvalu</option>
                                    <option value="Uganda">Uganda</option>
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="United Arab Emirates">United Arab Emirates</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="United States">United States</option>
                                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                    <option value="Uruguay">Uruguay</option>
                                    <option value="Uzbekistan">Uzbekistan</option>
                                    <option value="Vanuatu">Vanuatu</option>
                                    <option value="Venezuela">Venezuela</option>
                                    <option value="Viet Nam">Viet Nam</option>
                                    <option value="Virgin Islands, British">Virgin Islands, British</option>
                                    <option value="Virgin Islands, U.s.">Virgin Islands, U.s.</option>
                                    <option value="Wallis and Futuna">Wallis and Futuna</option>
                                    <option value="Western Sahara">Western Sahara</option>
                                    <option value="Yemen">Yemen</option>
                                    <option value="Zambia">Zambia</option>
                                    <option value="Zimbabwe">Zimbabwe</option>
                                </select>
                                </div>
                                <br></br>
                                <div className='field'>
                                    <p>Gender</p>
                                    <select  onChange={(e)=>setGender(e.target.value)}>
                                    <option disabled selected value> -- select an option -- </option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                
                                <div className='field'>
                                    <p>Level</p>
                                    <select  onChange={(e)=>setLevel(e.target.value)}>
                                    <option disabled selected value> -- select an option -- </option>
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Expert</option>
                                    </select> 
                                </div>
                            </div>
                            
                            <h1>Select Program</h1>
                            <div className='fields'>

                                
<br></br>
                                {program.map((input,index)=>{ 
                                    return(
                                        <div key={index}>
                                            <div className='field'>
                                            
                                            {program.length - 1 === index && program.length < 3 && ( // IF ELSE SA FRONTEND (only appears if program <3)
                                                <button className='button1'
                                                type="button"
                                                onClick={programAdd}
                                                >
                                                <span>Add a Program</span>
                                                </button>
                                            )}
                                            <a>&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                            {program.length-1  === index && program.length <= 3 &&program.length >1 && ( // IF ELSE SA FRONTEND (only appears if program <3)
                                                <button className='button1'
                                                type="button"
                                                onClick={programRemove}
                                                >
                                                <span>Remove</span>
                                                </button>
                                            )}
                                            </div>
                                            <div className='field'>
                                                <p>Instrument</p>
                                                <select  
                                                    name='instrument'
                                                    onChange={(e)=>handleFormChange(e,index)}>
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
                                                </select> {/*DROP DOWN*/}
                                            </div>
                                            <br></br>   
                                            <div className='field'>
                                                <p>Program</p>
                                                <select  
                                                    name='programName'
                                                    onChange={(e)=>{changeDropdown(e,index)}}>
                                                    <option disabled selected value> -- select an option -- </option>
                                                        <option>1 hour</option>
                                                        <option>30 min</option>
                                                </select> {/*DROP DOWN (might change to checkbox)*/}
                                            </div>
                                            
                                            <div className='field'> 
                                                <p>Number of Sessions</p>
                                                {index==0 &&(
                                                    <select  name='numSessions' onChange={(e)=>handleFormChange(e,index)}> <option disabled selected value> -- select an option -- </option>{options}</select>
                                                )}
                                                {index==1 &&(
                                                    <select name='numSessions' onChange={(e)=>handleFormChange(e,index)}> <option disabled selected value> -- select an option -- </option>{options1}</select>
                                                )}
                                                 {index==2 &&(
                                                    <select name='numSessions' onChange={(e)=>handleFormChange(e,index)}> <option disabled selected value> -- select an option -- </option>{options2}</select>
                                                )}
                                                
                                                
                                            </div>
                                            <br></br>
                                            
                                        </div>
                                    )
                                })}
                                
                             
                            </div>
                    </div>
                    
                
            </form>
        </div>
         
            
    )

}