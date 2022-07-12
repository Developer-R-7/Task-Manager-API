import * as yup from 'yup';
import { NextFunction, Response, Request } from 'express';

type RequestLocation = 'query' | 'body' | 'params';

export function validateRequest(location: RequestLocation, schema: yup.AnyObjectSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    let _location: any;
    switch (location) {
      case 'query':
        _location = req.query;
        break;
      case 'body':
        _location = req.body;
        break;
      case 'params':
        _location = req.params;
        break;
    }
    try {
      const validatedData = await schema.validate(_location, {
        stripUnknown: true,
      });
      switch (location) {
        case 'query':
          req.query = validatedData as any;
          break;
        case 'body':
          req.body = validatedData;
          break;
        case 'params':
          req.params = validatedData as any;
          break;
        default:
          break;
      }
      next();
    } catch (error) {
      const message = error.errors[0];
      return res.status(500).json({ error: message });
    }
  };
}
