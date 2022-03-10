const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const login = require('./routes/auth/login')
const mongoose = require('./lib/mongoose')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const app = express()
mongoose()

// Server config
app.set('port', process.env.PORT || 3001)
// change origin in production
app.use(
  cors({
    origin: '*',
  })
)
app.use(express.json())
app.use(morgan('dev'))

// api routes
app.use('/api/auth', login)

app.listen(app.get('port'), () => {
  console.log(`server running on port ${app.get('port')}`)
})
