const express = require('express');
const router = express.Router();

const mentorController =   require('../controllers/mentor.controller');

router.post('/getlistmentor', mentorController.getlistmentor);
router.post('/booking', mentorController.bookingmentor);
router.post('/giverating', mentorController.giverating);

module.exports = router;