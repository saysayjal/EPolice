var express = require('express');
var router = express.Router();
var User = require('../models/user');
const Report = require('../models/report'); 



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

//get login page
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

//get home page
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

//get report page
router.get('/report', function(req, res, next) {
  res.render('report', { title: 'Express' });
});

//get admin page
router.get('/admin', async(req, res, next)=> {
  const reports = await Report.find();
  res.render('admin', { title: 'Express', reportsList: reports });
});

//get map page
router.get('/map', function(req, res, next) {
  res.render('map', { title: 'Express' });
});

router.post('/signup',async (req, res) => {
  // Handle the form submission and save user data to the database
  //console.log("jyoti");
  const newUser =  new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    usertype:req.body.usertype
  })
  await User.insertMany([newUser])
  res.render("home");
});


//for login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });

      if (user && user.comparePassword(password)) {
          // Password matches
          res.render('home'); // Redirect to the next page on successful login
      } else {
          // Password doesn't match or user not found
          res.render('login', { error: 'Invalid email or password. Please try again.' });
      }
  } catch (err) {
      console.error(err);
      
  }
  res.render('home');
});

//report.ejs



router.post('/report',async (req, res) => {
  // Handle the form submission and save user data to the database
  console.log(req.body);
  const newReport =  new Report({
    description: req.body.description,
    
  })
  await Report.insertMany([newReport])
  res.render('home');
});



  
module.exports = router;


