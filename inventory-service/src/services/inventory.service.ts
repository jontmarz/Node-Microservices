import db from '../models/db.js';
import axios from 'axios';

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001/api';

interface InventoryItem {
  cantidad: number;
  // Add other properties if needed
}

export const inventoryService = {
  getStock: async (producto_id: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      db.get('SELECT cantidad FROM inventarios WHERE producto_id = ?', [producto_id], (err, row) => {
        if (err) return reject(err);
        resolve((row as InventoryItem)?.cantidad || 0);
      });
    });
  },

  updateStock: async (producto_id: number, cantidad: number): Promise<void> => {
    const exists = await inventoryService.productExists(producto_id);
    if (!exists) throw new Error('Producto no encontrado');

    return new Promise((resolve, reject) => {
      db.run(
        `
        INSERT INTO inventarios (producto_id, cantidad)
        VALUES (?, ?)
        ON CONFLICT(producto_id)
        DO UPDATE SET cantidad = cantidad + excluded.cantidad
      `,
        [producto_id, cantidad],
        err => {
          if (err) return reject(err);
          console.log(`📦 Inventario actualizado para producto ${producto_id}`);
          resolve();
        }
      );
    });
  },

  productExists: async (id: number): Promise<boolean> => {
    try {
      const response = await axios.get(`${PRODUCT_SERVICE_URL}/productos/${id}`, {
        headers: { 'x-api-key': process.env.INTERNAL_API_KEY || '' },
        timeout: 3000
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
};
