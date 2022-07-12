import { boolean, string, object, InferType, date } from 'yup';
import { periodType } from '../shared/constants';

export const createTaskListSchema = object({
  name: string().required(),
  description: string().required(),
  active: boolean().required(),
});

export type taskListSchema = InferType<typeof createTaskListSchema>;

export const createTaskSchema = object({
  taskName: string().required(),
  taskDescription: string().required(),
  dueDate: date().required(),
  period: string().required(),
  periodType: string().oneOf([...periodType]),
  taskListId: string().required(),
});

export type taskSchema = InferType<typeof createTaskSchema>;
