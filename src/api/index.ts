import { Router, Request, Response } from 'express';
import { validateRequest } from '../shared/validator';
import LoggerInstance from '../loaders/logger';
import { createTaskListSchema, createTaskSchema } from '../shared/schemas';
import { createtasklist, createTask } from './controller';

const createTaskListHandler = async (req: Request, res: Response) => {
  try {
    await createtasklist(req.body);
    res.status(200).json({ success: true, message: 'Task List was successfully created' });
  } catch (error) {
    LoggerInstance.error(error);
    res.status(error.code || 500).json({ success: false, message: error.message || 'Internal server error' });
  }
};

const createTaskHandler = async (req: Request, res: Response) => {
  try {
    await createTask(req.body);
  } catch (error) {
    LoggerInstance.error(error);
    res.status(error.code || 500).json({ success: false, message: error.message || 'Internal server error' });
  }
};

export default (): Router => {
  const app = Router();
  app.post('/createtasklist', validateRequest('body', createTaskListSchema), createTaskListHandler);
  app.post('/createtask', validateRequest('body', createTaskSchema), createTaskHandler);
  app.get('/tasklist', validateRequest('params'));
  /*
    If period type is monthly than period should be like Apr 2022 or May 2022 or so on. Same for monthly and yearly.
    due date should be after end of period.
  */
  return app;
};
