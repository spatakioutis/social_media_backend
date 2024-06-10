const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const uploadRoute = require('./routes/upload')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use('/register', registerRoute)
app.use('/login', loginRoute)
app.use('/upload', uploadRoute)

mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to database successfully'))
        .catch(err => console.error('Database connection error:', err))

app.listen(5000, () => {
    console.log('Server listening on port 5000...')
})

