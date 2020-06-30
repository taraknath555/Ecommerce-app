const express = require('express')
const adminSignupTemplet = require('../../views/admin/auth/signup')
const adminSigninTemplet = require('../../views/admin/auth/signin')
const adminRepo = require('../../repositories/admin')



const router = express.Router()

router.get('/signup', (req,res) => {
  res.send(adminSignupTemplet())
})

router.post('/signup', async (req,res) => {
  const {
    email,
    password,
    confirmPassword
  } = req.body

  const existingUser = await adminRepo.getOneBy({email})
  if(existingUser){
    return res.send('Email in use')
  }
  if(password !== confirmPassword){
    return res.send('Password must match')
  }

  const user = await adminRepo.create({email,password})
  req.session.userId = user.id
  res.send('Sign up Successfully!')
})

router.get('/signin', (req,res) => {
  res.send(adminSigninTemplet({req}))
})

router.post('/signin', async (req,res) => {
  const {email, password} = req.body
  const user = await adminRepo.getOneBy({email})

  if(!user){
    return res.send('Email not found')
  }

  const validPassword = await adminRepo.comparePassword(
    user.password,
    password
  )

  if(!validPassword){
    return res.send('Invalid Password')
  }
  req.session.userId = user.id
  res.send('Sign In successfully!')
})

router.get('/signout', (req,res) => {
  req.session = null
  res.send('Logged out')
})

module.exports = router