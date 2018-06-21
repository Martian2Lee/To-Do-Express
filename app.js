const createError = require('http-errors')
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const promisify = require('es6-promisify')
const expressValidator = require('express-validator')

const routes = require('./routes/index')
require('./handlers/passport')

// create our Express app
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views')) // this is the folder where we keep our pug files
app.set('view engine', 'pug') // we use the engine pug, mustache or EJS work great too

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')))

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser())

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Exposes a bunch of methods for validating data
app.use(expressValidator())

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
)

// // Passport JS is what we use to handle our logins
app.use(passport.initialize())
app.use(passport.session())

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req)
  next()
})

// After all that above middleware, we finally handle our own routes
app.use('/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  const { locals, status, render } = res

  // set locals, only providing error in development
  locals.message = err.message
  locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  status(err.status || 500)
  render('error')
})

module.exports = app
