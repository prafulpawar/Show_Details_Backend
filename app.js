const express = require('express');
const session = require('express-session'); // Import express-session
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser')
const ConnectDB = require('./config/db');
ConnectDB();
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');

// app.use(bodyParser.urlencoded({ extended: true })); // For form submissions
// app.use(bodyParser.json()); // For JSON payloads

app.use(express.json());
app.use(cookieParser())

app.use(session({
  secret: 'your-secret-key', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.set('views','views')
app.set('view engine','ejs');

app.use('/', userRoutes);

// Session middleware


app.use('/users', userRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
