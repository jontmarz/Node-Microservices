import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // log en formato estructurado
  ),
  transports: [
    new winston.transports.Console()
    // Se puede agregar aquí File o HTTP transport si lo deseas
  ],
});
