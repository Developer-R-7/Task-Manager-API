import { Router } from 'express';
import { validateRequest } from '../../shared/validator';

export default (): Router => {
  const app = Router();
  app.get('/createtasklist', validateRequest('body'));

  return app;
};
