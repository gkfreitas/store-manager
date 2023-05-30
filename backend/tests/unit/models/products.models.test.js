const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsMock } = require('./mocks/products.models.mock');
const connection = require('../../../src/models/connection');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);
    const result = await productsModel.findAll();
    expect(result).to.be.deep.equal(productsMock);
  });

  it('Recuperando um produto a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);
    const result = await productsModel.findById(1);
    expect(result).to.be.deep.equal(productsMock[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});