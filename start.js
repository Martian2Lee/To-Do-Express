const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' }) // import environmental variables from our variables.env file

const app = require('./app')

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE)
mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`)
})

// Start our app
app.set('port', process.env.PORT || 3000)
const server = app.listen(app.get('port'), () =>
  console.log(`Express running → PORT ${server.address().port}`)
)
