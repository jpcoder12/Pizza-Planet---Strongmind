// Import modules
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const Users = require('./models/users')
const bcrypt = require('bcrypt')
require('dotenv').config()

// Access forms inside of req
app.use(express.urlencoded({extended: false}))

// MongoDB
mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true},
    () => {
      console.log('Connected to MongoDB')
    })
const db = mongoose.connection
db.on('error', (err) => console.error(err))

// Set EJS as the view engine
app.set('view engine', 'ejs')

// Middleware
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// Routes
// This is temporary, when I add passport this will be checking for authentication before going to login
app.use('/dashboard', require('./controllers/dashboard'))

app.get('/', (req, res, next) => {
    // if user is authenticated, render dashboard with data. Otherwise, show login. 
    res.render('login')
})
app.get('/new', (req, res, next) => {
    res.render('newuser')
})
app.post('/new', async (req, res, next) => {
    try {
        const hashPass = await bcrypt.hash(req.body.password, 10)
        Users.create({
            username: req.body.username,
            fname: req.body.fname,
            lname: req.body.lname || '',
            password: hashPass,
            permissions: req.body.permissions
        })
        console.log('User successfully created')
        res.redirect('/')
    } catch {
        console.log('error')
    }
})
app.post('/login-user', async (req, res, next) => {
    
    console.log(req.body.username)
    
    res.redirect(`dashboard`)
    
})
app.get('/index', (req, res, next) => {
    res.render('index')
})
app.get('/test', (req, res, next) => {
    res.render('visualtest')
    console.log('Test styles')
})


const PORT = 3000
app.listen(PORT) 