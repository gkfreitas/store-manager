const express = require('express');

const app = express();

const { productsRouter, salesRouter } = require('./routers');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

module.exports = app;
