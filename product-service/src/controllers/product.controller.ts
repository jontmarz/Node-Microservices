import { Request, Response } from 'express';
import { productService } from '../services/product.service.js';

const formatJsonApi = (resource: string, data: any) => ({
  data: {
    type: resource,
    id: String(data.id),
    attributes: data
  }
});

export const productController = {
  create: async (req: Request, res: Response) => {
    try {
      const product = await productService.createProduct(req.body.data.attributes);
      res.status(201).json(formatJsonApi('producto', product));
    } catch (err) {
      res.status(500).json({ errors: [{ detail: 'Error interno' }] });
    }
  },

  get: async (req: Request, res: Response) => {
    const product = await productService.getProductById(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ errors: [{ detail: 'Producto no encontrado' }] });
    }
    res.json(formatJsonApi('producto', product));
  },

  update: async (req: Request, res: Response) => {
    try {
      const product = await productService.updateProduct(
        Number(req.params.id),
        req.body.data.attributes
      );
      res.json(formatJsonApi('producto', product));
    } catch {
      res.status(500).json({ errors: [{ detail: 'Error actualizando producto' }] });
    }
  },

  remove: async (req: Request, res: Response) => {
    try {
      await productService.deleteProduct(Number(req.params.id));
      res.status(204).send();
    } catch {
      res.status(500).json({ errors: [{ detail: 'Error eliminando producto' }] });
    }
  },

  list: async (req: Request, res: Response) => {
    const pageData = req.query.page as { [key: string]: string };
    const limit = parseInt(pageData?.limit || '10');
    const offset = parseInt(pageData?.offset || '0');
    const products = await productService.listProducts(limit, offset);
    res.json({ data: products.map(p => formatJsonApi('producto', p).data) });
  }
};
