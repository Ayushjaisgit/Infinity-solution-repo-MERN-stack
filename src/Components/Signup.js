import { Navbars } from './Navbars';
import axios from 'axios'
import React, { useState } from 'react'
import { API_BASE_URL } from '../api'
import { useNavigate } from "react-router-dom";




const Signup = () => {

  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/createuser`, {
        username: username,
        password: password,
      });

      console.log('RESPONSE =>', response)
      console.log('ERROR =>', Error.messege)
      // const handleUserTypeChange = (e) => {
      //   setuserType(e.target.value);
      // };
      const token = response.data;
      localStorage.setItem('token', token);

      if (response) {
        alert("you are succesfully registered, Login to raise your request")
        navigate("/");
      } else {
        navigate("/error")
      }
      // Store the token in local storage
      console.log('token token =======>', token)
    } catch (error) {
      console.log(error)
    }
  };

  function togglePasswordVisibility() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  return (
    <>
      <Navbars />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Sign Up Form</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Please fill these details given below to get signed up and raise request</p>
          </div>
          <form onSubmit={handleSubmit} className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div className="relative flex-grow w-full">
              <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Create a unique Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="full-name" name="full-name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-transparent focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
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
            <button className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Register</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Signup
