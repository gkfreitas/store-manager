const salesMock = [
  {
    saleId: 1,
    date: '2023-05-30T22:40:47.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-05-30T22:40:47.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-05-30T22:40:47.000Z',
    productId: 3,
    quantity: 15,
  },
];

const newSale = [
  {
    productId: 3,
    quantity: 15,
  },
  {
    productId: 1,
    quantity: 5,
  },
];

module.exports = {
  salesMock,
  newSale,
};