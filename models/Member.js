// Importing the mongoose library
const mongoose = require('mongoose');

// Defining a new mongoose schema for the 'Member' collection
const memberSchema = new mongoose.Schema({
  // Defining a field member_id of type Number
  member_id: Number,
  // Defining a field name of type String
  name: String
});

// Creating a mongoose model named 'Member' based on the 'memberSchema' schema
module.exports = mongoose.model('Member', memberSchema);
