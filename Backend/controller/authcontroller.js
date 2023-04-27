const express = require('express')
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const User = require('../models/User');

const bcrypt = require('bcryptjs');
// jwt 
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'This is a string'

const CustomerRequest = require('../models/CustomerRequest');




////////////////////////////////////////////////Sign Up Endpoint for users only////////////////////////////////////////////////////

const createUser =  async (req, res) => {
    const { username, password, userType } = req.body; 

   let user = await User.findOne({ username: username })
   const salt = await bcrypt.genSalt(10) // generating random salt of ten values
   const secPass = await bcrypt.hash(password, salt) // bcrypt.hash is used to initialize the bcrypt

   if (user) {
     return res.status(400).json({ error: 'sorry a user with this username already exists' })
    }

    user = await User.create({
      username: username,
      password: secPass,
      userType: 'Customer',
    });
    console.log(user)
    res.send(user) 
  }
///////////////////////////////////////////////////////Login For Employee, User And Admin Exists///////////////////////////////////

  const login = async (req, res) => {
  
    const {username, password, userType}= req.body;
    if(userType === "Customer"){
    
    let user = await User.findOne({username});
    if (!user){
        return res.status(400).json({error:"Please try to login with correct credentials"})
      }
  
      const passwordCompare = await bcrypt.compare(password, user.password)
      if (!passwordCompare) {
        return res.status(400).json({error:"Please try to login with correct credentials"})
      }
      const data = {
        user: {
          id: user.id,
          username: user.username
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
      if(authtoken){
        // edit to send the page of the API
        // res.send(user)
        res.send({...data,authtoken})
        // return authtoken
        // res.redirect('/customer/request');
      } 
    }else if (
    
      userType === 'Employee' && ((username === 'employee1' && password === 'Admin1') || (username === username && password === password)) 
    ){
      if (userType === 'Employee') {
  
        //   if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
  
      const {username, password}= req.body;
  
         let user = await User.findOne({username});
         if (!user){
             return res.status(400).json({error:"Please try to login with correct credentials"})
         }
  
         const passwordCompare = await bcrypt.compare(password, user.password)
         if (!passwordCompare) {
             return res.status(400).json({error:"Please try to login with correct credentials"})
         }
         const data = {
             user: {
                 id: user.id,
                 username: user.username
             }
         }

         const authtoken = jwt.sign(data, JWT_SECRET)
         if(authtoken){
          res.send({...data,authtoken})
         }
  
      } else if (username === username) {
   
        const {username, password}= req.body;
  
        let user = await User.findOne({username});
        if (!user){
            return res.status(400).json({error:"Please try to login with correct credentials"})
        }
      
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({error:"Please try to login with correct credentials"})
        }
        const data = {
            user: {
                id: user.id,
                username: user.username
            }
        }
        // if employee exists then send authentication token and redirect the non admin employee to his tasks
        const authtoken = jwt.sign(data, JWT_SECRET)
        if(authtoken){
          res.send({...data,authtoken})
        }
  
      }
    } else {
      res.send('Invalid username or password.');
    }
  };

  //////////////////////////////Customer Request///////////////////////////////////////////////////
const raiseRequest = async (req, res) => {
  try {
    // get the current user from the request
    const currentUser = req.body.username;
    console.log('Current user =>',currentUser)
    // create a new customer request from the form data
    const customerRequest = await CustomerRequest.create({
      username: currentUser,
      productType: req.body.productType,
      issueType: req.body.issueType,
      issueDescription: req.body.issueDescription,
      policyFile: req.body.policyFile
    });
    console.log("asdfghjk",customerRequest)
    // save the customer request to the database
    // await customerRequest.save();

    // send a success response to the client
    res.status(200).send("Your request has been submitted. A customer care executive will be in touch with you soon.")

  } catch (error) {
    console.error(error);
  // send an error response to the client
  return res.status(500).send('Internal Server Error');
  }
};


////////////////////////////////////////////////Sign Up Endpoint for users only////////////////////////////////////////////////////
  const mytasks = async (req, res) => {
    // const currentUser = req.user.username
    const UserId = req.user.id 
    let findData={
      _id: UserId
    }
    console.log(UserId)
  
    let employeeUser = await User.findById(UserId)
    console.log('sdfghjkl' ,employeeUser)
  
    let findDocument = await CustomerRequest.findOne({assignedTo:findData})
    console.log("find =>",findDocument)

    if(!findDocument){
      res.status(200).send("You have no tasks available right now")

    }else if(findDocument){
   
      let sendResponse = await CustomerRequest.findOne({ _id:findDocument._id }).populate( "assignedTo" );
      console.log("send res=>",sendResponse)
      // console.log(task)
      if(sendResponse.assignedTo.username === employeeUser.username){
        const task = await CustomerRequest.find({assignedStatus:true});
        res.send(task);
      
      }else {
      
      res.status(200).send("You have no tasks available right now")
    }
  }
  }
  const changeStatus = async(req, res) => {
  
    const requestId = req.body.requestId;
    const updateStatus = req.body.status;
    const username = req.body.username;
    
    const request = await CustomerRequest.findById(requestId);
    console.log(request);
  
    const employee = await User.findOne({"username":username});
    console.log("employee => ",employee);
  
    if (!request || !employee) {
      return res.status(404).send({ message: 'Task or Employee not found.' });
    }
  
    let findData={
      _id: requestId
    }
  
    let updateData = {
      status:updateStatus,
    }
    let assignResponse = await CustomerRequest.findOneAndUpdate(findData, updateData,{ new:true });
    console.log(assignResponse);
    res.send(assignResponse)
    // res.redirect('/my-tasks');
  }


  
////////////////////////////////////////////////////////////////  Admin Operations  ////////////////////////////////////  
const allocatedTasks =  async(req, res) => {
  const task = await CustomerRequest.find({assignedStatus:true}).populate("assignedTo");

  if(!task){
    res.json(err)
  }else{
    res.send(task)
  }
  
  // res.render('/allocated-tasks');
}
const employeeList =  async(req, res) => {
  const task = await User.find({userType:"Employee"});

  if(!task){
    res.json(err)
  }else{
    res.send(task)
  }
  
  // res.render('/allocated-tasks');
}
const unallocatedTasks = async (req, res) => {
  const status =  await CustomerRequest.find({assignedStatus:false})
  if(!status){
    res.json(err)
  }else{
    res.send(status)
  } 
}
const editunallocatedTasks = async (req, res) => {
  const requestId = req.body.requestId;
  const employeeName = req.body.employee;
  // const username = req.body.username;
  
  const request = await CustomerRequest.findById(requestId);
  console.log(request);
  
  const employee = await User.findOne({"username":employeeName});
  console.log("employee => ",employee);

  if (!request || !employee) {
    return res.status(404).send({ message: 'Task or Employee not found.' });
  }
  
  let findData={
    _id: requestId
  }

  let updateData = {
    assignedTo:employee._id,
    assignedStatus: true
  }
  let assignResponse = await CustomerRequest.findOneAndUpdate(findData, updateData,{ new:true });
  console.log(assignResponse);
  let sendResponse = await CustomerRequest.findOne({ _id:assignResponse._id }).populate( "assignedTo" );

  console.log("Send Response  => ", sendResponse);
  res.send(sendResponse)

} 
  exports.raiseRequest = raiseRequest
  exports.login = login
  exports.createUser = createUser
  exports.allocatedTasks = allocatedTasks
  exports.changeStatus = changeStatus
  exports.unallocatedTasks = unallocatedTasks
  exports.editunallocatedTasks = editunallocatedTasks
  exports.mytasks = mytasks
  exports.employeeList = employeeList