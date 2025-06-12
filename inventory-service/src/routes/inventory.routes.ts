import { Router } from 'express';
import { inventoryController } from '../controllers/inventory.controller.js';
import { apiKeyAuth } from '../middleware/apiKey.middleware.js';

const router = Router();

router.use(apiKeyAuth);
router.get('/inventario/:id', inventoryController.getStock);
router.patch('/inventario/:id', inventoryController.updateStock);

export default router;
