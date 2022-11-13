import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const logger = new Logger();
    res.on('finish', () => {
      logger.log(`${req.ip} ${req.method} ${res.statusCode}`, req.originalUrl);
    });
    next();
  }
}
