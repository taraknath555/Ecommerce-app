const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const adminAuthRoute = require('./routes/admin/auth')
const adminProductsRoute = require('./routes/admin/product')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/carts')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieSession({
  name : 'session',
  keys : ['ThisIsTheSessionKey']
}))
app.use(productRoute)
app.use(adminAuthRoute)
app.use(adminProductsRoute)
app.use(cartRoute)

//server setup
app.listen(port, () => {
  console.log(`Server listen on port: ${port}`)
})
