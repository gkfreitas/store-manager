// tests/unit/controllers/Product.controller.test.js

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsControler } = require('../../../src/controllers');
const { productsMock } = require('./mocks/products.controller.mock');

describe('Teste de unidade do productsControler', function () {
  describe('Listando as pessoas passageiras', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findAll')
        .resolves({ type: null, message: productsMock });

      await productsControler.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsMock);
    });
  });

  describe('Buscando uma pessoa passageira', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findById')
        .resolves({ type: null, message: productsMock[0] });
      await productsControler.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsMock[0]);
    });

    it('ao passar um id que não existe no banco deve retornar um erro', async function () {
      const res = {};
      const req = {
        params: { id: 9999 }, // passamos aqui um id fictício para forçar o erro esperado
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productsControler.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith('Product not found');
    });

    it('teste do erro 500', async function () {
      const res = {};
      const req = {
        params: { id: 9999 }, // passamos aqui um id fictício para forçar o erro esperado
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findById')
        .resolves({ type: 'blablabla', message: 'Product not found' });

      await productsControler.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(500); 
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
