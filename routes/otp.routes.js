const express = require('express');
const router = express.Router();

const otpController =   require('../controllers/otp.controller');

router.post('/checkotp', otpController.checkotp);
router.get('/requestotp/:id', otpController.requestotp);

module.exports = router;