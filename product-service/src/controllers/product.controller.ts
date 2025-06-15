import { Request, Response } from 'express';
import { productService } from '../services/product.service.js';
import { logger } from '../utils/logger.js';

const formatJsonApi = (resource: string, data: any) => ({
  data: {
    type: resource,
    id: String(data.id),
    attributes: data
  }
});

export const productController = {
  create: async (req: Request, res: Response) => {
    logger.info(`Solicitud para crear producto: ${JSON.stringify(req.body)}`);
    try {
      const product = await productService.createProduct(req.body.data.attributes);
      logger.info(`Producto creado exitosamente: ${JSON.stringify(product)}`);
      res.status(201).json(formatJsonApi('producto', product));
    } catch (err) {
      logger.error(`Error al crear producto: ${err.message}`);
      res.status(500).json({ errors: [{ detail: 'Error interno' }] });
    }
  },

  get: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    logger.info(`Solicitud para obtener producto con id: ${id}`);
    
    try {
      const product = await productService.getProductById(id);
      
      if (product) {
        logger.info(`Producto encontrado: ${JSON.stringify(product)}`);
        res.json(formatJsonApi('producto', product));
      } else {
        logger.warn(`Producto con id ${id} no encontrado`);
        res.status(404).json({ errors: [{ detail: 'Producto no encontrado' }] });
      }
    } catch (err) {
      logger.error(`Error al obtener producto ${id}: ${err.message}`);
      res.status(500).json({ errors: [{ detail: 'Error interno' }] });
    }
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    logger.info(`Solicitud para actualizar producto ${id}: ${JSON.stringify(req.body)}`);
    
    try {
      const product = await productService.updateProduct(id, req.body.data.attributes);
      logger.info(`Producto ${id} actualizado exitosamente`);
      res.json(formatJsonApi('producto', product));
    } catch (err) {
      logger.error(`Error al actualizar producto ${id}: ${err.message}`);
      res.status(500).json({ errors: [{ detail: 'Error actualizando producto' }] });
    }
  },

  remove: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    logger.info(`Solicitud para eliminar producto ${id}`);
    
    try {
      await productService.deleteProduct(id);
      logger.info(`Producto ${id} eliminado exitosamente`);
      res.status(204).send();
    } catch (err) {
      logger.error(`Error al eliminar producto ${id}: ${err.message}`);
      res.status(500).json({ errors: [{ detail: 'Error eliminando producto' }] });
    }
  },

  list: async (req: Request, res: Response) => {
    const pageData = req.query.page as { [key: string]: string };
    const limit = parseInt(pageData?.limit || '10');
    const offset = parseInt(pageData?.offset || '0');
    logger.info(`Solicitud para listar productos. Limit: ${limit}, Offset: ${offset}`);
    
    try {
      const products = await productService.listProducts(limit, offset);
      logger.info(`Se encontraron ${products.length} productos`);
      res.json({ data: products.map(p => formatJsonApi('producto', p).data) });
    } catch (err) {
      logger.error(`Error al listar productos: ${err.message}`);
      res.status(500).json({ errors: [{ detail: 'Error interno' }] });
    }
  }
};
