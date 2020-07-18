import request from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';

afterAll(async () => {
  await connection('product').truncate();
});

it('should create a product', async () => {
  const { status, body } = await request(app).post('/products').send({
    name: 'Café',
    price: 2.5,
    amount: 3,
    barcode: '7891000306703',
  });

  expect(status).toBe(201);
  expect(body.name).toBe('Café');
  expect(body.price).toBe(2.5);
  expect(body.amount).toBe(3);
  expect(body.barcode).toBe('7891000306703');
});

it('should list the all product', async () => {
  const { status, body } = await request(app).get('/products');

  expect(status).toBe(200);
  expect(body).toHaveLength(1);
});

it('should show a product', async () => {
  const { status, body } = await request(app).get('/products/1');

  expect(status).toBe(200);
  expect(body.name).toBe('Café');
  expect(body.price).toBe(2.5);
  expect(body.amount).toBe(3);
  expect(body.barcode).toBe('7891000306703');
});
