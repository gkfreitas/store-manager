const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const {
  productsModel,
} = require('../../../src/models');
const { productsMock } = require('./mocks/products.service.mock');

describe('Verificando service dos produtos', function () {
  describe('listagem de produtos', function () {
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

  describe('busca de um produto', function () {
    it('retorna um erro caso o produto não exista', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(undefined);
     
      // act
      const result = await productsService.findById(1);
      
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal({ message: 'Product not found' });
    });
  });

  it('retorna o produto caso ID existente', async function () {
    // arrange
    sinon.stub(productsModel, 'findById').resolves(productsMock[0]);
    
    // act
    const result = await productsService.findById(1);

    // assert
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(productsMock[0]);
  });

  it('retorna o ID da pessoa passageira cadastrada', async function () {
    sinon.stub(productsModel, 'insert').resolves(1);
    sinon.stub(productsModel, 'findById').resolves(productsMock[0]);

    const result = await productsService.createProduct({ name: 'ProductX' });
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(productsMock[0]);
  });
  
   afterEach(function () {
     sinon.restore();
   });
 });
