var express = require('express');
var router = express.Router();
const Report = require('../models/report');
router.get('/report', function(req, res, next) {
    res.render('report', { title: 'Express' });
  });
router.post('/report',async (req, res) => {
    // Handle the form submission and save user data to the database
    console.log(req.body);
    const newReport =  new Report({
      description: req.body.description,
    })
    await Report.insertMany([newReport])
    res.send("Report submitted");
    res.render('home');
  });
  module.exports = router;