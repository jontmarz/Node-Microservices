import request from 'supertest';
import express from 'express';
import productRoutes from '../src/routes/product.routes';

const app = express();
app.use(express.json());
app.use('/api', productRoutes);

describe('Product Service', () => {
  let productId: number;
  const apiKey = 'miclaveultrasecreta';

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/productos')
      .set('x-api-key', apiKey)
      .send({
        data: {
          type: 'producto',
          attributes: {
            nombre: 'Producto de prueba',
            precio: 99.99
          }
        }
      });

    expect(res.status).toBe(201);
    expect(res.body.data.attributes.nombre).toBe('Producto de prueba');
    productId = Number(res.body.data.id);
  });

  it('should get a product by ID', async () => {
    const res = await request(app)
      .get(`/api/productos/${productId}`)
      .set('x-api-key', apiKey);
    expect(res.status).toBe(200);
    expect(res.body.data.attributes.nombre).toBe('Producto de prueba');
  });

  it('should update a product', async () => {
    const res = await request(app)
      .patch(`/api/productos/${productId}`)
      .set('x-api-key', apiKey)
      .send({
        data: {
          type: 'producto',
          attributes: {
            nombre: 'Producto actualizado',
            precio: 149.99
          }
        }
      });
    expect(res.status).toBe(200);
    expect(res.body.data.attributes.nombre).toBe('Producto actualizado');
  });

  it('should list products with pagination', async () => {
    const res = await request(app)
      .get('/api/productos?page[limit]=10&page[offset]=0')
      .set('x-api-key', apiKey);
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should delete a product', async () => {
    const res = await request(app)
      .delete(`/api/productos/${productId}`)
      .set('x-api-key', apiKey);
    expect(res.status).toBe(204);
  });

  it('should return 404 for deleted product', async () => {
    const res = await request(app)
      .get(`/api/productos/${productId}`)
      .set('x-api-key', apiKey);
    expect(res.status).toBe(404);
  });
});
