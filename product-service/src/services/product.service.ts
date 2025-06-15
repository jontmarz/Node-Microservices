import db from '../models/db.js';
import { logger } from '../utils/logger.js';

export interface Product {
  id?: number;
  nombre: string;
  precio: number;
}

export const productService = {
  createProduct: (data: Product): Promise<Product> => {
    logger.info(`Creando producto: ${JSON.stringify(data)}`);
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO products (nombre, precio) VALUES (?, ?)',
        [data.nombre, data.precio],
        function (err) {
          if (err) {
            logger.error(`Error al crear producto: ${err.message}`);
            return reject(err);
          }
          logger.info(`Producto creado con id: ${this.lastID}`);
          resolve({ id: this.lastID, ...data });
        }
      );
    });
  },

  getProductById: (id: number): Promise<Product | undefined> => {
    logger.info(`Obteniendo producto por id: ${id}`);
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) {
          logger.error(`Error al obtener producto ${id}: ${err.message}`);
          return reject(err);
        }
        logger.info(`Producto obtenido: ${JSON.stringify(row)}`);
        resolve(row as Product);
      });
    });
  },

  updateProduct: (id: number, data: Product): Promise<Product> => {
    logger.info(`Actualizando producto id: ${id} con datos: ${JSON.stringify(data)}`);
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE products SET nombre = ?, precio = ? WHERE id = ?',
        [data.nombre, data.precio, id],
        function (err) {
          if (err) {
            logger.error(`Error al actualizar producto ${id}: ${err.message}`);
            return reject(err);
          }
          logger.info(`Producto actualizado id: ${id}`);
          resolve({ id, ...data });
        }
      );
    });
  },

  deleteProduct: (id: number): Promise<void> => {
    logger.info(`Eliminando producto id: ${id}`);
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM products WHERE id = ?', [id], (err) => {
        if (err) {
          logger.error(`Error al eliminar producto ${id}: ${err.message}`);
          return reject(err);
        }
        logger.info(`Producto eliminado id: ${id}`);
        resolve();
      });
    });
  },

  listProducts: (limit: number, offset: number): Promise<Product[]> => {
    logger.info(`Listando productos, limit: ${limit}, offset: ${offset}`);
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM products LIMIT ? OFFSET ?',
        [limit, offset],
        (err, rows) => {
          if (err) {
            logger.error(`Error al listar productos: ${err.message}`);
            return reject(err);
          }
          logger.info(`Productos listados: ${rows.length}`);
          resolve(rows as Product[]);
        }
      );
    });
  }
};
