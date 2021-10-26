const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const postsRoute = require('./routes/posts');

dotenv.config();
app.use(express.json())
app.use(cookieParser())

//cross origin resource sharing settings
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

//routes middlewares
app.use('/api/register',registerRoute)
app.use('/api/login',loginRoute)
app.use('/api/logout',logoutRoute)
app.use('/api/posts',postsRoute)

// connection with Data Base
mongoose.connect(process.env.DB_CONNECTION,()=>console.log('Connected to DB !'))

//port config
const port = process.env.PORT || 3333
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    console.log('Connecting to DB ...')
})