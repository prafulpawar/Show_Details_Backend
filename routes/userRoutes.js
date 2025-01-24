const express  = require('express');
const router   = express.Router();
const {createUserIndex,loginPageIndex, createUser,forgatepasswordIndex, verifyOtp, login, fogatepassword, verifyOtpReset,nowForgate,otpPage } = require('../controllers/userController'); // Add verifyOtp to import
const {isAuth} = require('../middleware/authMiddleware')
const upload        = require('../multer/multer');

// UserCreation
router.get('/',createUserIndex)
router.post('/createUser', upload.single('profilePic'), createUser);
router.post('/verifyOtp', verifyOtp);  


router.get('/loginPage',loginPageIndex)
router.post('/login',login)


router.get('/otp',otpPage)

router.get('/forgot-password',forgatepasswordIndex)
router.post('/forgot-password',fogatepassword)


router.post('/verifyotps',isAuth,verifyOtpReset)

router.post('/nowforgate',isAuth,nowForgate)
module.exports = router;
