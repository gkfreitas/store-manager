const express = require('express');
const { productsControler } = require('../controllers');
const validateNewProduct = require('../middlewares/validateNewProduct');

const router = express.Router();

router.get(
  '/',
  productsControler.listProducts,
);

router.get(
  '/:id',
  productsControler.getProduct,
);

router.post(
  '/',
  validateNewProduct,
  productsControler.createProduct,
);

module.exports = router;