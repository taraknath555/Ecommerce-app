const express = require('express')
const multer = require('multer')


const productRepo = require('../../repositories/products')
const productNewTemplet = require('../../views/admin/product/new')
const productIndexTemplet = require('../../views/admin/product/index')
const productUpdateTemplet = require('../../views/admin/product/edit')
const {
  handleErrors,
  requireAuth
} = require('./middlewares')
const {
  checkTitle,
  checkPrice
} = require('./validator')

const router = express.Router()
const upload = multer({storsge:multer.memoryStorage})

//Product Listing
router.get(
  '/admin/products',
  requireAuth,
  async (req,res) => {
    const products = await productRepo.getAll()
    res.send(productIndexTemplet({products}))
})

//Adding New Products
router.get(
  '/admin/products/new',
  requireAuth,
  (req,res) => {
  res.send(productNewTemplet({}))
})

router.post(
  '/admin/products/new',
  requireAuth,
  upload.single('image'),
  [checkTitle, checkPrice],
  handleErrors(productNewTemplet),
  async (req,res) => {
    const image = req.file.buffer.toString('base64')
    const {title, price} = req.body
    
    const product = await productRepo.create({title, price, image})
    res.redirect('/admin/products')
})

//Edit Products
router.get(
  '/admin/products/:id/edit',
  requireAuth,
  async (req,res) => {
    const id = req.params.id
    const product = await productRepo.getOne(id)
    res.send(productUpdateTemplet({product}))
})

router.post(
  '/admin/products/:id/edit',
  requireAuth,
  upload.single('image'),
  [checkTitle, checkPrice],
  handleErrors(productUpdateTemplet, async req => {
    const product = await productRepo.getOne(req.params.id)
    return {product}
  }),
  async (req, res) => {
    const id = req.params.id
    const changes = req.body
    if(req.file){
      changes.image = req.file.buffer.toString('base64')
    }
    await productRepo.update(id, changes)
    res.redirect('/admin/products')
})

//Delete Products
router.post(
  '/admin/products/:id/delete',
  requireAuth,
  async (req, res) => {
    const id = req.params.id
    await productRepo.delete(id)
    res.redirect('/admin/products')
})


module.exports = router