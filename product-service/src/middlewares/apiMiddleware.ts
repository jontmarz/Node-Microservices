import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

export function apiMiddleware(req: Request, res: Response, next: NextFunction) {
  logger.info(`Solicitud recibida: ${req.method} ${req.originalUrl} desde ${req.ip}`);
  try {
    next();
  } catch (error: any) {
    logger.error(`Error en apiMiddleware: ${error?.message || error}`);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}