import { Router } from 'express';
import { productController } from '../controllers/product.controller.js';
import { apiKeyAuth } from '../middleware/apiKey.middleware.js';

const router = Router();

router.use(apiKeyAuth);
router.post('/productos', productController.create);
router.get('/productos/:id', productController.get);
router.patch('/productos/:id', productController.update);
router.delete('/productos/:id', productController.remove);
router.get('/productos', productController.list);

export default router;
