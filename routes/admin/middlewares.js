const {validationResult} = require('express-validator')
module.exports = {
  handleErrors(templet, dataCb){
    return async (req,res,next) => {
      let data = {}
      if(dataCb){
        data = await dataCb(req)
      }
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return res.send(templet({errors, ...data}))
      }
      next()
    }
  },

  requireAuth(req,res,next){
    const userId = req.session.userId
    if(!userId){
      return res.redirect('/signin')
    }
    next()
  }

}