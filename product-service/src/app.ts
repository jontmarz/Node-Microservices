import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', productRoutes);
app.get('/health', (_, res) => res.send('OK'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Product service running on http://localhost:${PORT}`);
});
