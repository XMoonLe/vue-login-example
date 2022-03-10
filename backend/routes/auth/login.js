const router = require('express').Router()
const login = require('../../controllers/login')

router.post('/login', (req, res) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'method not supported' })

  login(req, res)
})

module.exports = router
