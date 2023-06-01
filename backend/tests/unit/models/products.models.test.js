const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsMock, newProduct } = require('./mocks/products.models.mock');
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

  it('Cadastrando um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const result = await productsModel.insert(newProduct);
    expect(result).to.equal(42);
  });

  it('Atualizando um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const result = await productsModel.update(newProduct);
    expect(result).to.equal(42);
  });

  afterEach(function () {
    sinon.restore();
  });
});