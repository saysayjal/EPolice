var express = require('express');
var router = express.Router();
const reportController = require('../controller/report.controller')

router.post('/',reportController.createReport);
router.get('/:reportId', reportController.getReportById);
router.get('/user/:userId', reportController.getAllReportByUserId);

module.exports = router;
