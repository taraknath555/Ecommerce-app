const express = require('express')
const adminSignupTemplet = require('../../views/admin/auth/signup')
const adminSigninTemplet = require('../../views/admin/auth/signin')

const router = express.Router()

router.get('/signup', (req,res) => {
  res.send(adminSignupTemplet())
})

router.post('/signup', (req,res) => {
  res.send('Registered Successfully!')
})

router.get('/signin', (req,res) => {
  res.send(adminSigninTemplet())
})

router.post('/signin', (req,res) => {
  res.send('Sign In successfully!')
})

module.exports = router