const otpGenerator = require('otp-generator');
const nodemailer = require('../middleware/nodemailer');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt')
// Helper function to collect data
function DataAdded({ email, password, name, address, city, country, phone, profilePic }) {
  return {
    email,
    password,
    name,
    address,
    city,
    country,
    phone,
    profilePic,
  };
}

module.exports.createUser = async (req, res) => {
  try {
    const userExists = await userModel.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(400).send({
        message: 'User already exists',
      });
    }

    const { email, password, name, address, city, country, phone } = req.body;

    if (!email || !password || !name || !address || !city || !country || !phone) {
      return res.status(400).send({
        message: 'Please fill all the fields',
      });
    }

    let profilePic = null;

    // File uploaded
    if (req.file) {
      profilePic = req.file.path;
      console.log('Profile picture uploaded:', req.file);
    } else {
      console.log('No profile picture uploaded');
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, specialChars: false });
    console.log('Generated OTP:', otp);

    // Send OTP to user via email
    const otpSent = await nodemailer.sendOtp(email, otp);
    if (!otpSent) {
      return res.status(500).send({ message: 'Failed to send OTP' });
    }

    // Store OTP temporarily for verification (in session)
    req.session.otp = otp;
    req.session.otpTime = Date.now(); // Store time of OTP generation (optional, for expiry)
    req.session.userData = DataAdded({ email, password, name, address, city, country, phone, profilePic });

    return res.status(200).send({
      message: 'OTP sent to email, please verify',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: error.message,
    });
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    // Check if OTP exists and is not expired (e.g., expire after 5 minutes)
    if (!req.session.otp || Date.now() - req.session.otpTime > 5 * 60 * 1000) {
      return res.status(400).send({
        message: 'OTP has expired or is not available',
      });
    }

    // Compare the OTP with the stored one
    if (otp === req.session.otp) {
      // If OTP matches, create the user
      const userData = req.session.userData;

      const user = await userModel.create(userData);

      // OTP is verified, so delete it from session
      delete req.session.otp;
      delete req.session.otpTime;
      delete req.session.userData;

      return res.status(200).send({
        message: 'User created successfully',
        data: user,
      });
    } else {
      return res.status(400).send({
        message: 'Invalid OTP',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: error.message,
    });
  }
};


module.exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;
    console.log(password)
    const user = await userModel.findOne({ email: email })
    if (!user) {
      return res.status(404).send({
        message: "Email Is Does Not Exists",
        success: false
      })
    }
    const comparePassword = await bcrypt.compare(password, user.password)
    console.log(comparePassword)
    if (!comparePassword) {
      return res.status(404).send({
        message: 'Email Or Password Error ',
        success: false
      })
    }
    const token = user.generateToken()
    return res.status(200).cookie("token", token, {
      expires: new Date(Date.now() + 36000000), // 1 hour
      httpOnly: process.env.NODE_ENV === "development" ? true : false,
      secure: process.env.NODE_ENV === "development" ? true : false,
      sameSite: process.env.NODE_ENV === "development" ? true : false
    }).send({
      message: 'Logged in successfully',
      user,
      success: true,
      token: token
    })

  }
  catch {

  }
}