const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const login = require('./routes/auth/login')

const app = express()

// Server config
app.set('port', process.env.PORT || 3001)
app.use(
  cors({
    origin: '*',
  })
)
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/auth', login)

app.listen(app.get('port'), () => {
  console.log(`app running on port ${app.get('port')}`)
})
