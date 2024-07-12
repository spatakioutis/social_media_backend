const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const profilePicRoute = require('./routes/profilePic')
const postsRoute = require('./routes/posts')
const profileRoute = require('./routes/profiles')
const userInfoRoute = require('./routes/userInfo')
const commentsRoute = require('./routes/comments')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use('/register', registerRoute)
app.use('/login', loginRoute)
app.use('/profilePic', profilePicRoute)
app.use('/posts', postsRoute)
app.use('/profile', profileRoute)
app.use('/userInfo', userInfoRoute)
app.use('/comments', commentsRoute)

mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to database successfully'))
        .catch(err => console.error('Database connection error:', err))

app.listen(5000, () => {
    console.log('Server listening on port 5000...')
})