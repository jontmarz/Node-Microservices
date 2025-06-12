import request from 'supertest';
import express from 'express';
import inventoryRoutes from '../src/routes/inventory.routes.js';
import { jest } from '@jest/globals';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use('/api', inventoryRoutes);

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Inventory Service', () => {
  const producto_id = 1;
  const apiKey = 'miclaveultrasecreta'; // Define API key once

  beforeEach(() => {
    // Clears all instances of mock, resets implementations, and clears call history.
    // This ensures each test starts with a fresh mock.
    mockedAxios.mockReset();

    // Default mock for the product service check, simulating product exists.
    // Adjust the 'data' part if your service uses specific fields from the product service response.
    mockedAxios.get.mockResolvedValue({ status: 200, data: { id: producto_id, name: 'Mocked Product' } });
  });

  it('should return 0 stock for a new product', async () => {
    const res = await request(app)
      .get(`/api/inventario/${producto_id}`)
      .set('x-api-key', apiKey); // Send header with supertest
    expect(res.status).toBe(200);
    expect(res.body.data.attributes.cantidad).toBe(0);
  });

  it('should update stock successfully', async () => {
    const res = await request(app)
      .patch(`/api/inventario/${producto_id}`)
      .set('x-api-key', apiKey) // Send header with supertest
      .send({
        data: {
          type: 'inventario',
          attributes: {
            cantidad: 15
          }
        }
      });

    expect(res.status).toBe(204);
  });

  it('should reflect updated stock', async () => {
    const res = await request(app)
      .get(`/api/inventario/${producto_id}`)
      .set('x-api-key', apiKey); // Send header with supertest
    expect(res.status).toBe(200);
    expect(res.body.data.attributes.cantidad).toBe(15);
  });

  it('should add more stock', async () => {
    const res = await request(app)
      .patch(`/api/inventario/${producto_id}`)
      .set('x-api-key', apiKey) // Send header with supertest
      .send({
        data: {
          type: 'inventario',
          attributes: {
            cantidad: 5 // This will be added to the existing 15
          }
        }
      });

    expect(res.status).toBe(204);

    const finalStock = await request(app)
      .get(`/api/inventario/${producto_id}`)
      .set('x-api-key', apiKey); // Send header with supertest
    // Assuming the service correctly sums: 15 (from previous test) + 5 = 20
    expect(finalStock.body.data.attributes.cantidad).toBe(20); 
  });

  it('should return 400 if product not found in product-service', async () => {
    const nonExistentProductId = 999;
    // Override the default mock from beforeEach for this specific test case.
    // Simulate the product service returning an error (e.g., 404, which translates to an error in axios.get).
    mockedAxios.get.mockRejectedValueOnce(new Error('Simulated Product Not Found Error')); 
    
    const res = await request(app)
      .patch(`/api/inventario/${nonExistentProductId}`)
      .set('x-api-key', apiKey) // Send header with supertest
      .send({
        data: {
          type: 'inventario',
          attributes: {
            cantidad: 1
          }
        }
      });

    expect(res.status).toBe(400);
    expect(res.body.errors[0].detail).toBe('Producto no encontrado');
    
    // Verifica que el servicio de producto fue llamado con el ID correcto (ignorando el segundo argumento)
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining(`/${nonExistentProductId}`),
      expect.any(Object)
    );
  });
});
