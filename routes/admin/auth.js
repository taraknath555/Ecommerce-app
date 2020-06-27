const express = require('express')
const adminSignupTemplet = require('../../views/admin/auth/signup')
const adminSigninTemplet = require('../../views/admin/auth/signin')
const repo = require('../../repositories/admin')


const router = express.Router()

router.get('/signup', (req,res) => {
  res.send(adminSignupTemplet())
})

router.post('/signup', async (req,res) => {
  const {
    username,
    password,
    confirmPassword
  } = req.body

  const existingUser = await repo.getOneBy({username})
  
  if(existingUser){
    return res.send('Email in use')
  }
  if(password !== confirmPassword){
    return res.send('Password must match')
  }
  
  await repo.create({username,password})
  res.send('Sign up Successfully!')
})

router.get('/signin', (req,res) => {
  res.send(adminSigninTemplet())
})

router.post('/signin', (req,res) => {
  console.log(req.body)
  res.send('Sign In successfully!')
})

module.exports = router