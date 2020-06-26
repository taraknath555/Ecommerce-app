const express = require('express')

const adminAuthRoute = require('./routes/admin/auth')

const app = express()
const port = process.env.PORT || 3000

app.use(adminAuthRoute)

//server setup
app.listen(port, () => {
  console.log(`Server listen on port: ${port}`)
})
