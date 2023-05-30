const express = require('express');
const { salesControler } = require('../controllers');
const validateNewSale = require('../middlewares/validateNewSale');

const router = express.Router();

router.get(
  '/',
  salesControler.listSales,
);

router.get(
  '/:id',
  salesControler.getSale,
);

router.post(
  '/',
  validateNewSale,
  salesControler.createSale,
);

module.exports = router;