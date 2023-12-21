var express = require('express');
var router = express.Router();
const userController = require('../controller/user.controller');
const Notification = require('../models/notification');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',userController.createUser)

router.get('/notifications', async (req, res) => {
  try {
    const { user } = req.session;

    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Fetch notifications for the user with status 'Approved' and isRead false
    const notifications = await Notification.find({
      userId: user.userId,
      status: 'Approved',
      is_read: false,
    });

    res.json({ notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
