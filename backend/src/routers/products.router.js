const express = require('express');
const { productsControler } = require('../controllers');

const router = express.Router();

router.get(
  '/',
  productsControler.listProducts,
);

router.get(
  '/:id',
  productsControler.getProduct,
);

module.exports = router;