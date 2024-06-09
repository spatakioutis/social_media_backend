const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path")
const db = require('./database')

const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const { register } = require('module')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL Database: ' + err.stack)
        return
    }
    console.log('Connected to MySQL Database as id ' + db.threadId)
})

app.use('/register', registerRoute)
app.use('/login', loginRoute)

app.listen(5000, () => {
    console.log('Server listening on port 5000...')
})
