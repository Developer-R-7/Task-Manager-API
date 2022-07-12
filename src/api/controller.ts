import dbClient from '../loaders/database';
import { taskListSchema } from '../../shared/schemas';

export const createtasklist = async (body: taskListSchema) => {
  const db = (await dbClient()).collection('tasklists');

  if ((await db.findOne({ name: body.name })) != null) {
    throw { code: 404, message: 'similar task list exists with same name' };
  }

  await db.insertOne({ ...body });
};
