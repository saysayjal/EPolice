var User = require("../models/user");
const Notification = require("../models/notification");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  // console.log("Here", Function.generatePassword());
  try {
    let email = req.body.email;
    email = email.toLowerCase();
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    let newObj = new User({
      // _id: new mongoose.Types.ObjectId(),
      email: email,
      usertype: req.body.usertype,
      username: req.body.username,
      password: hashPassword,
    });
    let newlyCreatedObj = await newObj.save();
    res.redirect("/login");
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: "Error. Try again later", err });
  }
};

exports.auth = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user) {
      return "Invalid email";
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      req.flash("error_msg", "Invalid email or password");
      return res.redirect("back");
    }
    if (email === user.email) {
      // Set user information in session
      req.session.user = { email: user.email, userId: user._id };

      const unReadNotifications = await Notification.find({
        user_id: user._id,
        is_read: false,
        status: { $in: ["Approved", "Handled"] },
      })
      .populate('report_id')
      .exec();
      const notificationIds = unReadNotifications.map((el)=>el._id)
      req.session.user.notification = unReadNotifications;
      req.session.user.notificationIds = notificationIds;
      console.log(req.session.user);
      // Redirect to the home page
      res.redirect("/home");
    } else {
      // Handle failed login
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error.message)
  }

  exports.getAllUser = async (req, res) => {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      console.log(error.message);
    }
  };

  exports.getUserById = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      return res.json(user);
    } catch (error) {
      console.log(error.message);
    }
  };

};
