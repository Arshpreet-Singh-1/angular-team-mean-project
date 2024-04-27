// Importing the express library
const express = require('express');
// Creating an instance of the express Router
const router = express.Router();
// Importing the Member model
const Member = require('../models/Member')

// Route to get all members
router.get('/', async (req, res) => {
    try {
      // Finding all members in the database
      const members = await Member.find();
      // Sending the members as a JSON response
      res.json(members);
    } catch (err) {
      // Handling any errors that occur and sending an error response
      res.status(500).json({ message: err.message });
    }
});


router.get('/search', async (req, res) => {
  const searchTerm = req.query.name; // Assuming the name parameter is passed as a query parameter
  
  try {
    // Using regular expression to search for members whose name contains the search term
    const members = await Member.find({ name: { $regex: searchTerm, $options: 'i' } });

    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route to get a single member by ID
router.get('/:id', async (req, res) => {
    try {
      // Finding a member by their member_id
      const member = await Member.findOne({ member_id: req.params.id });
      // If member is not found, send a 404 status with a message
      if (member == null) {
        return res.status(404).json({ message: 'Member not found' });
      }
      // Sending the found member as a JSON response
      res.json(member);
    } catch (err) {
      // Handling any errors that occur and sending an error response
      return res.status(500).json({ message: err.message });
    }
});

// Route to add a new member
router.post('/', async (req, res) => {
    // Find the maximum member_id and increment it by 1
    const maxMemberId = await Member.findOne({}, {}, { sort: { 'member_id': -1 } });
    const newMemberId = maxMemberId ? maxMemberId.member_id + 1 : 1;

    // Creating a new Member object with the provided data
    const member = new Member({
      member_id: newMemberId,
      name: req.body.name
    });
    try {
      // Saving the new member to the database
      const newMember = await member.save();
      // Sending the newly created member as a JSON response
      res.status(201).json(newMember);
    } catch (err) {
      // Handling any errors that occur during saving and sending an error response
      res.status(400).json({ message: err.message });
    }
});





// Route to update a member by ID
router.put('/:id', async (req, res) => {
    try {
      // Finding and updating a member by their member_id
      const updatedMember = await Member.findOneAndUpdate({ member_id: req.params.id }, req.body, { new: true });
      // Sending the updated member as a JSON response
      res.json(updatedMember);
    } catch (err) {
      // Handling any errors that occur and sending an error response
      res.status(400).json({ message: err.message });
    }
});

// Route to delete a member by ID
router.delete('/:id', async (req, res) => {
    try {
      // Finding and deleting a member by their member_id
      await Member.findOneAndDelete({ member_id: req.params.id });
      // Sending a success message as a JSON response
      res.json({ message: 'Member deleted' });
    } catch (err) {
      // Handling any errors that occur and sending an error response
      res.status(500).json({ message: err.message });
    }
});





// Exporting the router to be used in other files
module.exports = router;
