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

router.put(
  '/:id',
  validateNewProduct,
  productsControler.updateProduct,
);

module.exports = router;