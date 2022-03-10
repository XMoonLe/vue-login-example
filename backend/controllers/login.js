const users = [
  {
    username: 'Moon',
    email: 'moon@gmail.com',
    password: '12345',
  },
  {
    username: 'Lee',
    email: 'lee@gmail.com',
    password: '8910',
  },
]

const login = (req, res) => {
  const { password, username } = req.body

  if (!password)
    return res.status(400).json({ message: 'Password is required' })
  if (!username)
    return res.status(400).json({ message: 'Username is required' })

  const user = users.filter((u) => u.username === username)

  const correctPassword = user[0].password === password

  if (user.length === 0 || !correctPassword)
    return res.status(400).json({ message: 'Username or password incorrect' })

  res.status(200).json({ username: user[0].username, email: user[0].email })
}

module.exports = login
