const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesMock, newSale } = require('./mocks/sales.models.mock');
const connection = require('../../../src/models/connection');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock]);
    const result = await salesModel.findAll();
    expect(result).to.be.deep.equal(salesMock);
  });

  it('Recuperando um produto a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock[0]]);
    const result = await salesModel.findById(1);
    expect(result).to.be.deep.equal(salesMock[0]);
  });

  it('Cadastrando um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const result = await salesModel.insert(newSale);
    expect(result).to.equal(42);
  });

  afterEach(function () {
    sinon.restore();
  });
});