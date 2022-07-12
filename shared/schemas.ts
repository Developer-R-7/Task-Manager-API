import { boolean, string, object, number, InferType } from 'yup';

export const createTaskListSchema = object({
  name: string().required(),
  description: string().required(),
  active: boolean().required(),
});

export type taskListSchema = InferType<typeof createTaskListSchema>;
