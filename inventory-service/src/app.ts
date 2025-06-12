import express from 'express';
import dotenv from 'dotenv';
import inventoryRoutes from './routes/inventory.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', inventoryRoutes);
app.get('/health', (_, res) => res.send('OK'));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚚 Inventory service running on http://localhost:${PORT}`);
});
