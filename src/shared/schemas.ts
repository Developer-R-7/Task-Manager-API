import { boolean, string, object, InferType, date, number } from 'yup';
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
  dueDate: string().required(),
  period: string().required(),
  periodType: string().oneOf([...periodType]),
  taskListId: string().required(),
});

export type taskSchema = InferType<typeof createTaskSchema>;

export const getTaskListSchema = object({
  taskListID: string().required(),
  limit: number().required(),
  pageNumber: number().required(),
});

export type getTaskSchema = InferType<typeof getTaskListSchema>;
