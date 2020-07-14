const express = require('express')
const cartsRepo = require('../repositories/carts')
const productRepo = require('../repositories/products')
const cartShowTemplet = require('../views/carts/show')

const router = express.Router()

//show cart
router.get('/cart', async (req,res) => {
  const cart = await cartsRepo.getOne(req.session.cartId)
  for(let item of cart.items){
    const product = await productRepo.getOne(item.id)
    item.product = product
  }
  res.send(cartShowTemplet({items: cart.items}))
})


//Add product to cart
router.post('/cart/products', async (req,res) => {
  let cart;
  const productId = req.body.productId
  
  //Adding cart to to cookie session
  if(!req.session.cartId){
    cart = await cartsRepo.create({items:[]})
    req.session.cartId = cart.id
  }else{
    cart = await cartsRepo.getOne(req.session.cartId)
  }
  //check product already exist in cart or not
  const existingProduct = cart.items.find(
    item => item.id === productId
  )
  //update items
  if(existingProduct){
    existingProduct.quantity += 1
  }else{
    cart.items.push({id:productId, quantity:1})
  }

  await cartsRepo.update(cart.id, {items:cart.items})
  res.redirect('/cart')
})

router.post('/cart/delete', async (req,res) => {
  const itemId = req.body.itemId
  const cart = await cartsRepo.getOne(req.session.cartId)
  const filteredItems = cart.items.filter(item => item.id !==itemId)
  cartsRepo.update(cart.id, {
    items : filteredItems
  })
  res.redirect('/cart')
})


//Export router
module.exports = router