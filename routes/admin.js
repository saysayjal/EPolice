var express = require("express");
var router = express.Router();
const Report = require("../models/report");
const Notification = require("../models/notification");
const User = require("../models/user");

/* GET home page. */
router.get("/admin", async (req, res, next) => {
  const reports = await Report.find();
  const users = await UserActivation.find();
  res.render("admin", { title: "Express", reportsList: reports });
});

router.post("/:reportId/verify", async (req, res) => {
  const { reportId } = req.params;

  try {
    // Find the report by reportId
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    await Report.findOneAndUpdate(
      { _id: reportId },
      { $set: { status: "Approved" } }, // Set the status to 'Approved' and mark as read
      { new: true }
    );
  await updateNotificationStatus(reportId, "Approved");


    res.json({ message: "Notification approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }

});

router.post("/:reportId/handled", async (req, res) => {
  const { reportId } = req.params;
console.log(reportId);
  // Update the report status to 'Rejected'
  await Report.findByIdAndUpdate(
    { _id: reportId },
    { $set: { status: "Handled" } }, // Set the status to 'Rejected'
    { new: true }
  );

  // Update the corresponding notification status to 'Rejected'
  await updateNotificationStatus(reportId, "Handled");

  res.redirect("/admin"); // Redirect to the admin dashboard
});

async function updateNotificationStatus(reportId, status) {
  // Find the notification corresponding to the report
  const notification = await Notification.findOne({ report_id: reportId });
  if (notification) {
    // Update the notification status
    await Notification.findOneAndUpdate(
      { _id: notification._id },
      { $set: { status: status } },
      { new: true }
    );
  }
  const notificationAfter = await Notification.findOne({ report_id: reportId });
  console.log(notificationAfter,'after handle');

}
module.exports = router;
