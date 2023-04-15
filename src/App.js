import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import Navbar from './Components/Navbar';


import About from './Components/AdminDashboard';
import Signup from './Components/Signup';
import { Logins } from './Components/Logins';

import { Footer } from './Components/Footer';
// import AddNote from './Components/AddNote';
import { AddRequest } from './Components/AddRequest';
import { AdminDashboard } from './Components/AdminDashboard';
import { EmployeePage } from './Components/EmployeePage';
import { Alert } from 'antd';

function App() {
  return (
    // <NoteState>
    <Router>
        <Routes>
          <Route exact path="/" element={   <Logins/>} />
          <Route exact path="/about"
            element={<About />} />
              <Route exact path="/signup" element={<Signup/>}/>
              <Route exact path="/addnote" element={<AddRequest/>}/>
              <Route exact path="/admin" element={<AdminDashboard/>}/>
              <Route exact path="/employee" element={<EmployeePage/>}/>
              <Route exact path="/error" element={<Alert/>}/>
        </Routes>
        <Footer/>
      </Router>
    // </NoteState>
  );
}

export default App;
