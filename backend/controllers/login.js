const userSchema = require('../lib/schemas/user.schema')
const { compare, hash } = require('bcrypt')

// Since there's no way to fill this schema, I just created a helper that
// runs if there's no documents in user model, just for demonstration.
const dummyUserCreator = async (username, password) => {
  const users = await userSchema.countDocuments()
  if (users > 0) return

  hash(password, 10, async (error, hash) => {
    if (error) {
      console.error(error)
      return
    }

    try {
      const starterUser = new userSchema({ username, password: hash })
      await starterUser.save()
      console.log('User created successfully!')
    } catch (err) {
      console.error(err)
    }
  })
}

// Put your username and password here
dummyUserCreator('Murdock', '1234')

const login = async (req, res) => {
  const { password, username } = req.body
  const unsuccess_message = 'Username or password incorrect'

  // Simple data validation
  if (!password)
    return res.status(400).json({ message: 'Password is required' })
  if (!username)
    return res.status(400).json({ message: 'Username is required' })

  try {
    const user = await userSchema.findOne({ username })
    if (!user) return res.status(400).json({ message: unsuccess_message })

    compare(password, user.password, async (error, result) => {
      if (error)
        return res.status(500).json({
          message: 'An error occurried while trying to validate your data',
        })

      if (!result) return res.status(400).json({ message: unsuccess_message })

      res.status(200).json({ username: user.username, email: user.email })
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
    console.error(err)
  }
}

module.exports = login
