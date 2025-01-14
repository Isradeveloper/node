import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data/mongo-db';
import { UserEntity } from '../../domain';

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers['authorization'] as string;
      if (!authorization)
        return res.status(401).json({ message: 'No token provided' });
      if (!authorization.startsWith('Bearer '))
        return res.status(401).json({ message: 'Invalid token format' });

      const token = authorization.split(' ').at(1) || '';

      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ message: 'Invalid token' });

      const user = await UserModel.findById(payload.id);
      if (!user) return res.status(401).json({ message: 'Invalid token' });

      const { password, ...rest } = UserEntity.fromObject(user);

      req.body.user = rest;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
