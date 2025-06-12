import db from '../models/db.js';

export interface Product {
  id?: number;
  nombre: string;
  precio: number;
}

export const productService = {
  createProduct: (data: Product): Promise<Product> => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO products (nombre, precio) VALUES (?, ?)',
        [data.nombre, data.precio],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, ...data });
        }
      );
    });
  },

  getProductById: (id: number): Promise<Product | undefined> => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err);
        resolve(row as Product);
      });
    });
  },

  updateProduct: (id: number, data: Product): Promise<Product> => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE products SET nombre = ?, precio = ? WHERE id = ?',
        [data.nombre, data.precio, id],
        function (err) {
          if (err) return reject(err);
          resolve({ id, ...data });
        }
      );
    });
  },

  deleteProduct: (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM products WHERE id = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },

  listProducts: (limit: number, offset: number): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM products LIMIT ? OFFSET ?',
        [limit, offset],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows as Product[]);
        }
      );
    });
  }
};
