const express = require('express')
const {validationResult} = require('express-validator')
const adminSignupTemplet = require('../../views/admin/auth/signup')
const adminSigninTemplet = require('../../views/admin/auth/signin')
const adminRepo = require('../../repositories/admin')
const {
  checkEmail,
  checkPassword,
  checkConfirmPassword,
  checkEmailExist,
  checkValidPassword
} = require('./validator')

const router = express.Router()


//*****************Routes*********************
router.get('/signup', (req,res) => {
  res.send(adminSignupTemplet({}))
})

router.post(
  '/signup',
  [checkEmail, checkPassword, checkConfirmPassword],
  async (req,res) => {
    //checking validation error
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.send(adminSignupTemplet({errors}))
    }

    //creating new record
    const {email,password,confirmPassword} = req.body
    const user = await adminRepo.create({email,password})
    req.session.userId = user.id
    res.send('Sign up Successfully!')
})

router.get('/signin', (req,res) => {
  res.send(adminSigninTemplet({}))
})

router.post(
  '/signin',
  [checkEmailExist, checkValidPassword],
  async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.send(adminSigninTemplet({errors}))
    }

    const user = await adminRepo.getOneBy({email:req.body.email})
    req.session.userId = user.id
    res.send('Sign In successfully!')
})

router.get('/signout', (req,res) => {
  req.session = null
  res.send('Logged out')
})

module.exports = router