const express  = require('express');
const router   = express.Router();
const { createUser, verifyOtp, login } = require('../controllers/userController'); // Add verifyOtp to import
const upload        = require('../multer/multer');

router.post('/createUser', upload.single('image'), createUser);
router.post('/verifyOtp', verifyOtp);  // Add verify OTP route
router.post('/login',login)
module.exports = router;
