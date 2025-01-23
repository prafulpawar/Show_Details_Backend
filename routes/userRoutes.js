const express  = require('express');
const router   = express.Router();
const { createUser, verifyOtp, login, fogatepassword, verifyOtpReset } = require('../controllers/userController'); // Add verifyOtp to import
const {isAuth} = require('../middleware/authMiddleware')
const upload        = require('../multer/multer');

router.post('/createUser', upload.single('image'), createUser);
router.post('/verifyOtp', verifyOtp);  // Add verify OTP route
router.post('/login',login)
router.post('/resetepass',isAuth,fogatepassword)
router.post('/verifyotp',verifyOtpReset)
module.exports = router;
