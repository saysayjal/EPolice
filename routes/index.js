var express = require('express');
var router = express.Router();
var User = require('../models/user');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/report', function(req, res, next) {
  res.render('report', { title: 'Express' });
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
router.post('/login',async (req, res) => {
  try{
   const check = await User.findOne({email:req.body.email})
    if(check.password==req.body.password){
      res.send("login successful")
    }
    else{
      res.send("invalid password")
    }
  }
  catch{
    res.status(400).send("TRY AGAIN")
  }
});

/*router.post('/report',async (req, res) => {
  // Handle the form submission and save user data to the database
  console.log(req.body);
  const newReport =  new Report({
    description: req.body.description,
    
  })
  await Report.insertMany([newReport])
  res.send("Report submitted");
  res.render('home');
});*/


module.exports = router;