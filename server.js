// Importing necessary libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); // For loading environment variables
const cors = require('cors');
const path = require('path');

// Creating an instance of Express
const app = express();
// Setting the port to either the environment variable PORT or 3000
const PORT = process.env.PORT || 3000;
// Retrieving the MongoDB URI from the environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected')) // If connection is successful, log a message
  .catch(err => console.log(err)); // If there's an error, log the error message

// Middleware
app.use(cors()); // Using cors middleware to allow cross-origin requests
app.use(bodyParser.json()); // Using body-parser middleware to parse JSON request bodies
app.use(express.static('client/browser'));

// Routes
const memberRoutes = require('./routes/memberRoutes'); // Importing member routes
app.use('/api/members', memberRoutes); // Using the member routes at the '/api/members' endpoint
// Catch all other routes and return the Angular index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/browser/index.html'));
});


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Starting the server and logging a message once it's running
