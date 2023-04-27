import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5001/api/auth'; // Replace with your API base URL

export const headers=()=>{
  const head = new Headers();
  const session = {
    token:localStorage.getItem('token')
  }
  if(session.token){
  head.append("x-user-token",session.token)
  }

}

// Define more functions for other APIs as needed
