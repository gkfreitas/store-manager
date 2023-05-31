const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { salesMock, newSale } = require('./mocks/sales.models.mock');

describe('Verificando service dos sales', function () {
  describe('listagem de sales', function () {
    it('retorna a lista completa de pessoas passageiras', async function () {
      sinon.stub(salesModel, 'findAll').resolves(salesMock);
      const result = await salesService.findAll();
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(salesMock);
    });
  });

  it('retorna o sale caso ID existente', async function () {
    sinon.stub(salesModel, 'findById').resolves(salesMock[0]);
    const result = await salesService.findById(1);
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(salesMock[0]);
  });
  
   afterEach(function () {
     sinon.restore();
   });
 });
