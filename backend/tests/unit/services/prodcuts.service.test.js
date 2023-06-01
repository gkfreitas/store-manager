const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const {
  productsModel,
} = require('../../../src/models');
const { productsMock } = require('./mocks/products.service.mock');

describe('Verificando service de produtos', function () {
  describe('listagem de produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      sinon.stub(productsModel, 'findAll').resolves(productsMock);
      
      const result = await productsService.findAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(productsMock);
    });
  });

  describe('busca de um produto', function () {
    it('retorna um erro caso o produto não exista', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);
     
      const result = await productsService.findById(1);
      
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal({ message: 'Product not found' });
    });

    it('retorna o produto caso exista', async function () {
      sinon.stub(productsModel, 'findById').resolves(productsMock[0]);
      
      const result = await productsService.findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productsMock[0]);
    });
  });

  describe('cadastro de uma pessoa passageira com valores válidos', function () {
    it('retorna o ID da pessoa passageira cadastrada', async function () {
      // arrange
      sinon.stub(productsModel, 'insert').resolves(productsMock[0]);
      sinon.stub(productsModel, 'findById').resolves(productsMock[0]);
      
      // act
      const result = await productsService.createProduct({ name: 'ProdutoX' });

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productsMock[0]);
    });
  });

  describe('atualizando dados de um produto', function () {
    it('retorna produto atualizado', async function () {
      sinon.stub(productsModel, 'update').resolves(productsMock[0]);
      sinon.stub(productsModel, 'findById').resolves(productsMock[0]);
      
      const result = await productsService.updateProduct(1, { name: 'ProdutoX' });

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productsMock[0]);
    });
  });
  
   afterEach(function () {
     sinon.restore();
   });
 });
