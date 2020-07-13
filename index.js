const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const adminAuthRoute = require('./routes/admin/auth')
const adminProductsRoute = require('./routes/admin/product')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieSession({
  name : 'session',
  keys : ['ThisIsTheSessionKey']
}))
app.use(adminAuthRoute)
app.use(adminProductsRoute)

//server setup
app.listen(port, () => {
  console.log(`Server listen on port: ${port}`)
})
