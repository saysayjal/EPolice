var express = require('express');
var router = express.Router();
var User = require('../models/user');
const Report = require('../models/report'); 
const userController = require('../controller/user.controller')




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
  const { notification } = req.session.user;
  const {user}= req.session;
  if (user) {
    res.render('home', {  user, notification });
  } else {
    // If user data is not available, render the 'home' page without user data
    res.render('home', { title: 'Express' ,notification:[]});
  }
});

//get report page
router.get('/report', function(req, res, next) {
  res.render('report', { title: 'Express' });
});


router.get('/user', function(req, res, next) {
  res.render('user', { title: 'Express' });
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

router.post('/signup',userController.createUser)
// router.post('/signup',async (req, res) => {
//   // Handle the form submission and save user data to the database
//   //console.log("jyoti");
//   const newUser =  new User({
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//     usertype:req.body.usertype
//   })
//   await User.insertMany([newUser])
//   res.render("home");
// });

router.get('/hospital', function(req, res, next) {
  res.render('map1', { title: 'Express' });
});

//get user page
router.get('/user', function(req, res, next) {
  res.render('user', { title: 'Express' });
});

router.post('/signup',async (req, res) => {
  const newUser =  new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    
  })
  await User.insertMany([newUser])
  res.redirect("home");
});


//for login
router.post('/login', userController.auth)
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//       const user = await User.findOne({ email });

//       if (user && user.comparePassword(password)) {
//           // Password matches
//           res.render('home'); // Redirect to the next page on successful login
//       } else {
//           // Password doesn't match or user not found
//           res.render('login', { error: 'Invalid email or password. Please try again.' });
//       }
//   } catch (err) {
//       console.error(err);

//   }
//   res.render('home');
// });

//report.ejs



// router.post('/report',async (req, res) => {
//   // Handle the form submission and save user data to the database
//   console.log(req.body);
//   const newReport =  new Report({
//     description: req.body.description,

//   })
//   await Report.insertMany([newReport])
//   res.render('home');
// });



router.post('/submit/:reportId',async (req, res) => {
  if(req.body.verified=='on'){
    await Report.findByIdAndUpdate(req.params.reportId, {
      'verified':true
    });
  }
  if(req.body.handled=='on'){
    await Report.findByIdAndUpdate(req.params.reportId, {
      'handled':true
    });
  }
  res.redirect('/admin');

});



  
module.exports = router;