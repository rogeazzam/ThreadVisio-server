const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser')

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database not connected', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', require('./routes/authRoutes'));
app.use('/files', require('./routes/fileRoutes'));

const port = 8000
app.listen(port, () => console.log(`Server is running on port ${port}`))