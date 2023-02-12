const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// routers
const sessionsRouter = require('./src/routers/sessionsRouter')
const adminRouter = require('./src/routers/adminRouter')
const authRouter = require('./src/routers/authRouter')

// port
const PORT = process.env.PORT || 3000

// middleware
app.use(express.static(path.join(__dirname, '/public/')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
    session({
        secret: 'nodepractice',
        resave: false,
        saveUninitialized: false,
        secure: true, // Use secure cookie
    })
)

// passport
require('./src/config/passport.js')(app)

// views
app.set('views', './src/views')
app.set('view engine', 'ejs')

// routers
app.use('/sessions', sessionsRouter)
app.use('/admin', adminRouter)
app.use('/auth', authRouter)

// routes
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/signup', (req, res) => {
    res.render('signup')
})

// listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
