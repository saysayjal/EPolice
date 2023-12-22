const express = require("express");
const router = express.Router();
const Notification = require('../models/notification');

// Update a group of notification IDs
router.post('/update', async (req, res) => {
  try {
    const { notificationIds } = req.body;

    // Assuming you have a method in your model to mark notifications as read
    await Notification.updateMany(
      { _id: { $in: notificationIds } },
      { $set: { is_read: true, status: 'Approved' } }
    );

    return res.json({ success: true, message: 'Notifications updated successfully' });
  } catch (error) {
    console.error(error);

  }
});

module.exports = router;
