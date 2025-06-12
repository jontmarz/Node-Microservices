import { Request, Response, NextFunction } from 'express';

const API_KEY = process.env.API_KEY || 'miclaveultrasecreta';

export function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  // Asegúrate de que el header es exactamente 'x-api-key'
  const key = req.header('x-api-key');
  if (key !== API_KEY) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}
