const express = require('express');
const session = require('express-session'); // Import express-session
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser')
const ConnectDB = require('./config/db');
ConnectDB();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser())
// Session middleware
app.use(session({
  secret: 'your-secret-key', // Replace with a strong secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // For development; set to true for production with HTTPS
}));

const userRoutes = require('./routes/userRoutes');

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
