const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { salesMock } = require('./mocks/sales.models.mock');

const invalidSale = [
  {
    productId: 99,
    quantity: 1,
  },
];

describe('Verificando service dos sales', function () {
  describe('listagem de sales', function () {
    it('retorna a lista completa de vendas', async function () {
      sinon.stub(salesModel, 'findAll').resolves(salesMock);
      const result = await salesService.findAll();
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(salesMock);
    });
  });

  describe('busca de uma pessoa passageira', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      const result = await salesService.findById(99);
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.deep.equal({ message: 'Sale not found' });
    });

    it('retorna a venda caso ID existente', async function () {
      sinon.stub(salesModel, 'findById').resolves(salesMock[0]);
      const result = await salesService.findById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(salesMock[0]);
    });
});

describe('cadastro de uma venda com produto não existente', function () {
  it('retorna um erro ao passar um nome inválido', async function () {
    const result = await salesService.createSale(invalidSale);
    expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.deep.equal({ message: 'Product not found' });
  });
});
   afterEach(function () {
     sinon.restore();
   });
 });
