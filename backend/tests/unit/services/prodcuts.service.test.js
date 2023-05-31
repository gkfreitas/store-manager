const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const {
  productsModel,
} = require('../../../src/models');
const { productsMock } = require('./mocks/products.service.mock');

describe('Verificando service pessoa passageira', function () {
  describe('listagem de pessoas passageiras', function () {
    it('retorna a lista completa de pessoas passageiras', async function () {
      // arrange
      sinon.stub(productsModel, 'findAll').resolves(productsMock);
      
      // act
      const result = await productsService.findAll();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(productsMock);
    });
  });

  describe('busca de uma pessoa passageira', function () {
    it('retorna um erro caso a pessoa passageira não existe', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(undefined);
     
      // act
      const result = await productsService.findById(1);
      
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal({ message: 'Product not found' });
    });
  });
  
   afterEach(function () {
     sinon.restore();
   });
 });
