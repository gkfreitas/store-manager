const express = require('express');
const { salesControler } = require('../controllers');

const router = express.Router();

router.get(
  '/',
  salesControler.listSales,
);

router.get(
  '/:id',
  salesControler.getSale,
);

module.exports = router;