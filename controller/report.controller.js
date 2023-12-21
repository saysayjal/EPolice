const Report = require("../models/report");
const Notification = require("../models/notification");

exports.createReport = async (req, res) => {
  try {
    const { user } = req.session;
    let newObj = new Report({
      // _id: new mongoose.Types.ObjectId(),
      description: req.body.description,
      reported_by: user?.userId,
    });
    let newReport = await newObj.save();

    // Notify the admin about the new report
    await createNotificationForAdmin(newReport, user);
    res.redirect("/home");
  } catch (error) {
    throw error;
  }
};

async function createNotificationForAdmin(report, user) {
  return await Notification.create({
    user_id: user?.userId,
    report_id: report._id,
    status: "Pending",
  });
}
