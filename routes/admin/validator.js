const {check} = require('express-validator')
const adminRepo = require('../../repositories/admin')

module.exports = {
  checkEmail : check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email')
    .custom(async email => {
      const existingUser = await adminRepo.getOneBy({email})
      if(existingUser){
        throw new Error('Email in use')
      }
    }),

  checkPassword : check('password')
    .trim()
    .isLength({min:4, max:15})
    .withMessage('Password must be between 4 to 15 characters'),

  checkConfirmPassword : check('confirmPassword')
    .trim()
    .isLength({min:4, max:15})
    .withMessage('Password must be between 4 to 15 characters')
    .custom(async (confirmPassword, {req}) => {
      if(confirmPassword !== req.body.password){
        throw new Error('Passwords must be same')
      }
    }),

  checkEmailExist : check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must provide a valid email')
    .custom(async email => {
      const user = await adminRepo.getOneBy({email})
      if(!user){
        throw new Error('Email not found')
      }
    }),

  checkValidPassword : check('password')
    .trim()
    .custom(async (password, {req}) => {
      const user = await adminRepo.getOneBy({email: req.body.email})
      if(!user){
        throw new Error('Invalid password')
      }
      const validPassword = await adminRepo.comparePassword(
        user.password,
        password
      )
      if(!validPassword){
        throw new Error('Invalid password')
      } 
    })
}