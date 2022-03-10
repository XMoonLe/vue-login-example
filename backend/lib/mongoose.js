const { connection, connect } = require('mongoose')

const dbConnection = async () => {
  const db = await connect(process.env.MONGODB_URL)
}

connection.on('connected', () => console.log('MongoDB connected.'))

connection.on('error', (err) => console.log(err))

module.exports = dbConnection
