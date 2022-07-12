import { Router, Request, Response } from 'express';
import { validateRequest } from '../../shared/validator';
import LoggerInstance from '../loaders/logger';
import { createTaskListSchema } from '../../shared/schemas';
import { createtasklist } from './controller';

const createTaskListHandler = async (req: Request, res: Response) => {
  try {
    await createtasklist(req.body);
    res.status(200).json({ success: true, message: 'Task List was successfully created' });
  } catch (error) {
    LoggerInstance.error(error);
    res.status(error.code || 500).json({ success: false, message: error.message || 'Internal server error' });
  }
};

export default (): Router => {
  const app = Router();
  app.post('/createtasklist', validateRequest('body', createTaskListSchema), createTaskListHandler);

  return app;
};
