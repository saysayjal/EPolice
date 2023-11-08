const express = require('express');
const router = express.Router();
const Report = require('../models/report'); // Import your Mongoose model for reports


// Handle form submission to store data in the database
router.post('/submit', (req, res) => {
    const { dataToStore } = req.body.description; // Extract data from the form

    // Create a new report and save it to the database
    const report = new Report({ dataToStore });
    report.save()
        .then(() => {
        
            res.redirect('/home'); // Redirect to the "report" page or another page as needed
        })
        .catch(err => {
            // Handle the error appropriately
            console.error(err);
            res.status(500).send('Error storing data.');
        });
});

module.exports = router;
