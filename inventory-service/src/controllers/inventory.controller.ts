import { Request, Response } from 'express';
import { inventoryService } from '../services/inventory.service.js';

export const inventoryController = {
  getStock: async (req: Request, res: Response) => {
    try {
      const cantidad = await inventoryService.getStock(Number(req.params.id));
      res.json({
        data: {
          type: 'inventario',
          id: req.params.id,
          attributes: { cantidad }
        }
      });
    } catch {
      res.status(500).json({ errors: [{ detail: 'Error consultando inventario' }] });
    }
  },

  updateStock: async (req: Request, res: Response) => {
    const { cantidad } = req.body.data.attributes;
    try {
      await inventoryService.updateStock(Number(req.params.id), cantidad);
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ errors: [{ detail: err.message }] });
    }
  }
};
