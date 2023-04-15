const mongoose = require('mongoose');

const CustomerRequestSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  productType: {
    type: String,
    enum: ['Mobile Phone', 'TV', 'Refrigerator', 'Washing Machine'],
    required: true
  },
  issueType: {
    type: String,
    required: true
  },
  issueDescription: {
    type: String
  },
  policyUpload: {
    type: String,
    // required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedStatus: {
    type: Boolean,
    default:false
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'On Hold', 'Completed'],
    default: 'Open'
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

const CustomerRequest = mongoose.model('CustomerRequest', CustomerRequestSchema);

module.exports = CustomerRequest;
