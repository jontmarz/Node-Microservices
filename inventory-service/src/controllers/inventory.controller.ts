import { Request, Response } from 'express';
import { inventoryService } from '../services/inventory.service.js';
import { logger } from '../utils/logger.js'; // Asegúrate de importar el logger

export const inventoryController = {
  getStock: async (req: Request, res: Response) => {
    logger.info(`Solicitud GET /inventario/${req.params.id}`);
    try {
      const cantidad = await inventoryService.getStock(Number(req.params.id));
      logger.info(`Stock consultado para producto_id ${req.params.id}: ${cantidad}`);
      res.json({
        data: {
          type: 'inventario',
          id: req.params.id,
          attributes: { cantidad }
        }
      });
    } catch (error: any) {
      logger.error(`Error consultando inventario para producto_id ${req.params.id}: ${error?.message || error}`);
      res.status(500).json({ errors: [{ detail: 'Error consultando inventario' }] });
    }
  },

  updateStock: async (req: Request, res: Response) => {
    const { cantidad } = req.body.data.attributes;
    logger.info(`Solicitud PATCH /inventario/${req.params.id} con cantidad: ${cantidad}`);
    try {
      await inventoryService.updateStock(Number(req.params.id), cantidad);
      logger.info(`Stock actualizado para producto_id ${req.params.id} con cantidad: ${cantidad}`);
      res.status(204).send();
    } catch (err: any) {
      logger.error(`Error actualizando inventario para producto_id ${req.params.id}: ${err.message}`);
      res.status(400).json({ errors: [{ detail: err.message }] });
    }
  }
};
