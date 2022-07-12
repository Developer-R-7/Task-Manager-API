import { Router, Request, Response } from 'express';
import { validateRequest } from '../shared/validator';
import LoggerInstance from '../loaders/logger';
import { createTaskListSchema, createTaskSchema, getTaskListSchema } from '../shared/schemas';
import { createtasklist, createTask, getTaskList } from './controller';

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
    res.status(200).json({ success: true, message: 'Task was created' });
  } catch (error) {
    LoggerInstance.error(error);
    res.status(error.code || 500).json({ success: false, message: error.message || 'Internal server error' });
  }
};

const getTaskListHandler = async (req: Request, res: Response) => {
  try {
    const result = await getTaskList(req.body);
    res.status(200).json(result);
  } catch (error) {
    LoggerInstance.error(error);
    res.status(error.code || 500).json({ success: false, message: error.message || 'Internal server error' });
  }
};

export default (): Router => {
  const app = Router();
  app.post('/createtasklist', validateRequest('body', createTaskListSchema), createTaskListHandler);
  app.post('/createtask', validateRequest('body', createTaskSchema), createTaskHandler);
  app.get('/tasklist', validateRequest('body', getTaskListSchema), getTaskListHandler);
  /*
    1] If period type is monthly than period should be like Apr 2022 or May 2022 or so on. Same for monthly and yearly.
    2] Due date should be after end of period.

    taking searchText
  */
  return app;
};
