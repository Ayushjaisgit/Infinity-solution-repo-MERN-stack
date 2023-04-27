import React, {useState} from 'react'
import {API_BASE_URL} from '../api'
import './Logins.css'
import { Navbars } from './Navbars'
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export const Logins = () => {

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function selectOption(option) {
    setuserType(option);
    setIsOpen(false);
  }
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
        const response = await axios.post(`${API_BASE_URL}/login`,{
          username: username,
          password: password,
          userType: userType
        })
        console.log(response)
        const authToken = await response.data.authtoken
        const usernametoken = await response.data.user.username
      
        localStorage.setItem('token',authToken);
        localStorage.setItem('customer',usernametoken);
        if (authToken) {
          if (userType === "Customer") {
            navigate("/addnote");
          } else if (userType === "Employee") {
            if (username === "employee1") { 
              navigate("/admin");
            }else{
              navigate("/employee");
            }
            return axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
          }
        } else{
          alert("Invalid credentials");
      }
  
      } catch (error) {
        alert("Invalid credentials");
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
    

      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="options-menu"
          onClick={toggleDropdown} >{userType}
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 14l6-6H4z" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => selectOption('Customer')}
            >
              Customer
            </a>
            <a
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => selectOption('Employee')}
            >
              Employee
            </a>
          </div>
        </div>
      )}

  
        <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Username</label>


        {/* <Select defaultValue="Customer"  onChange={(e) => setuserType(e.target.value)}  value={userType}   style={{ width: 120 }} >
      <Option value="Customer">Customer</Option>
      <Option value="Employee">Employee</Option>
    </Select> */}

        <input type="text" value={username} name="full-name" onChange={(e) => setUsername(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        {/* <input type="text" value={userType} name="full-name" onChange={(e) => setuserType(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/> */}
      </div>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Password</label>
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
      {/* /p className="text-xs text-gray-500 mt-3">`${error}`</p> */}
    </form>
  </div>
</section>
</>
  )
}
