const mongoose = require('mongoose');

// define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['Customer', 'Employee'],
    required: true
  },
  Date:{
    type:Date,
    default:Date.now
}
});

// create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
