import { ObjectId } from 'mongodb';
import dbClient from '../loaders/database';
import { taskListSchema, taskSchema } from '../shared/schemas';

export const createtasklist = async (body: taskListSchema) => {
  const db = (await dbClient()).collection('tasklists');

  if ((await db.findOne({ name: body.name })) != null) {
    throw { code: 400, message: 'Similar task list exist with same name' };
  }

  await db.insertOne({ ...body });
};

export const createTask = async (body: taskSchema) => {
  const db = (await dbClient()).collection('tasklists');
  if ((await db.findOne({ $match: { _id: ObjectId(body.taskListId) } })) === null) {
    throw { code: 404, message: 'Task List does not exist for this id' };
  }
};
