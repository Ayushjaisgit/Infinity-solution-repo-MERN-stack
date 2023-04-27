const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const User = require('../models/User');
const onController  = require('../controller/authcontroller')
const fileUpload =require ('../controller/fileUpload')

const CustomerRequest = require('../models/CustomerRequest');
const fetchuser = require('../middleware/FetchUser');


////////////////////////////////////////////////Sign Up Endpoint for users only////////////////////////////////////////////////////

router.post('/createuser', onController.createUser)

router.post('/myEndpoint', (req, res) => {
  const authToken = req.headers.authorization?.split(' ')[1]; // get token from Authorization header
  console.log(authToken)  
  // use authToken to perform any necessary authentication or authorization checks
  res.send('Success'); // return success response to the frontend
});

router.get('/myEndpoint', (req, res) => {
  const authToken = req.headers.authorization?.split(' ')[1]; // get token from Authorization header
  console.log(authToken)  
  // use authToken to perform any necessary authentication or authorization checks
  res.send(authToken); // return success response to the frontend
});


///////////////////////////////////////////////////////////login when user exists///////////////////////////////////
// user authentication
router.post('/login', onController.login);

////////////////////////////////////////////////////////////////handle login form submit///////////////////////////////////////////////////////////////
// support request form
// handle support request form submit
router.post('/support-request',fetchuser, onController.raiseRequest);

// save support request
router.post('/support-requestfile ',fetchuser ,  fileUpload.single('file'), (req, res) => {
try {
  let file = req.file.filename
  res.status(200).json({
    message: 'File uploaded successfully!',
    filename: file,
  })
} catch (error) {
  console.log(error)
}
        

  // res.send('Your request has been submitted. A customer care executive will be in touch with you soon.');
});

////////////////////////////////////////////////////////////// Super Admin Section ///////////////////////////////////////////////////////////
// unallocated tasks
// Route 1 get unallocated tasks
router.get('/unallocated-tasks',fetchuser, onController.unallocatedTasks);

// handle assign task
// Route 2 assign task to employee
router.patch('/unallocated-tasks/assign/:taskId' ,fetchuser, onController.editunallocatedTasks);
// allocated tasks
// get allocated tasks 
router.get('/allocated-tasks', fetchuser, onController.allocatedTasks);

// get employee list to assign
router.get('/employee/list', fetchuser, onController.employeeList);


////////////////////////////////////////////////////////////// Employeee Section ///////////////////////////////////////////////////////////
// my tasks
// get employee's tasks
router.get('/my-tasks',fetchuser,onController.mytasks);
// handle change status
// update task status
router.patch('/my-tasks/status/:taskId/',fetchuser,onController.changeStatus);

module.exports = router;