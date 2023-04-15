import React, {useState} from 'react'
import axios from 'axios'
import {API_BASE_URL} from '../api'
import './Logins.css'
// import { Footer } from './Footer'
import { Navbars } from './Navbars'
import { useNavigate } from "react-router-dom";




export const Logins = () => {


  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setuserType] = useState('');
    // const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${API_BASE_URL}/login`, {
          username: username,
          password: password,
          userType: userType
        });
        console.log('sdfghjklasdfghjkl; =>',userType)
      
        console.log('RESPONSE =>',response)
        console.log('ERROR =>',Error.messege)
        // const handleUserTypeChange = (e) => {
        //   setuserType(e.target.value);
        // };
        const token = response.data;
        localStorage.setItem('token', token);
        
       console.log( localStorage.getItem('token', token))

        axios.interceptors.request.use(
          config => {
            config.headers.authorization = `Bearer ${token}`;
            return config;
          },
          error => Promise.reject(error)
        );
      

        if(response){
            if (userType === "Customer") {
            navigate("/addnote");
          } else if (userType === "Employee") {
              if (username === "employee1") { 
                  navigate("/admin");
                }else{
                    navigate("/employee");
                  }
                }
              } else{
                  navigate("/errorpage")
                }
                // Store the token in local storage
        console.log('token token =======>',token)
      } catch (error) {
            console.log(error)          
      }
    };
  return (
<>
<Navbars/>
<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 className="title-font font-medium text-3xl text-gray-900">Log In</h1>
      <li className="leading-relaxed mt-4">Login as Customer to Raise a request/complaint.</li>
      <li className="leading-relaxed mt-1">Login as Employee to get All the assigned tasks.</li>
    </div>
    <form  onSubmit={handleSubmit} className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-1">Login User</h2>
      <h2 className="text-gray-500 text-lg font-medium title-font mb-1">Please Select User Type</h2>
      
      <div className="p-1">
<div className="dropdown inline-block relative">

</div>

</div>

      <div className="relative mb-4">
        <label for="full-name" className="leading-7 text-sm text-gray-600">Username</label>
        <input type="text" value={username} name="full-name" onChange={(e) => setUsername(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        <input type="text" value={userType} name="full-name" onChange={(e) => setuserType(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label for="email" className="leading-7 text-sm text-gray-600">Password</label>
        <div className="relative">
      <input
        className="form-input rounded-md shadow-sm block w-full pr-10"
        value={password} onChange={(e) => setPassword(e.target.value)} 
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        required
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
        onClick={togglePasswordVisibility}
      >
        <svg
          className="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3 5a5 5 0 015-5M6 12a5 5 0 015-5m-5 5a5 5 0 015 5m0-5a5 5 0 015-5"
          />
        </svg>
      </button>
    </div>
      </div>
      <button type='submit' onClick={handleSubmit} className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Log In</button>
      {/* <p className="text-xs text-gray-500 mt-3">`${error}`</p> */}
    </form>
  </div>
</section>
{/* <Footer/> */}
</>
  )
}
