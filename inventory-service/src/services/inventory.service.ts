import db from '../models/db.js';
import axios from 'axios';
import { logger } from '../utils/logger.js';

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001/api';

interface InventoryItem {
  cantidad: number;
  // Add other properties if needed
}

export const inventoryService = {
  getStock: async (producto_id: number): Promise<number> => {
    logger.info(`Obteniendo stock para producto_id: ${producto_id}`);
    return new Promise((resolve, reject) => {
      db.get('SELECT cantidad FROM inventarios WHERE producto_id = ?', [producto_id], (err, row) => {
        if (err) {
          logger.error(`Error al obtener stock para producto_id ${producto_id}: ${err.message}`);
          return reject(err);
        }
        logger.info(`Stock actual para producto_id ${producto_id}: ${(row as InventoryItem)?.cantidad || 0}`);
        resolve((row as InventoryItem)?.cantidad || 0);
      });
    });
  },

  updateStock: async (producto_id: number, cantidad: number): Promise<void> => {
    logger.info(`Actualizando stock para producto_id: ${producto_id} con cantidad: ${cantidad}`);
    const exists = await inventoryService.productExists(producto_id);
    if (!exists) {
      logger.warn(`Intento de actualizar stock para producto inexistente: ${producto_id}`);
      throw new Error('Producto no encontrado');
    }

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
          if (err) {
            logger.error(`Error al actualizar inventario para producto ${producto_id}: ${err.message}`);
            return reject(err);
          }
          logger.info(`Inventario actualizado para producto ${producto_id}`);
          resolve();
        }
      );
    });
  },

  productExists: async (id: number): Promise<boolean> => {
    logger.info(`Verificando existencia de producto_id: ${id}`);
    try {
      const response = await axios.get(`${PRODUCT_SERVICE_URL}/productos/${id}`, {
        headers: { 'x-api-key': process.env.INTERNAL_API_KEY || '' },
        timeout: 3000
      });
      logger.info(`Producto ${id} existe en el servicio de productos`);
      return response.status === 200;
    } catch (error: any) {
      logger.warn(`No se pudo verificar existencia de producto ${id}: ${error?.message || error}`);
      return false;
    }
  }
};
