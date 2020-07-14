const express = require('express')
const productRepo = require('../repositories/products')
const productTemplet = require('../views/products/index')

const router = express.Router()

router.get('/', async (req,res) => {
  const products = await productRepo.getAll()
  res.send(productTemplet({products}))
})

module.exports = router