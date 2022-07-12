import { ObjectId } from 'mongodb';
import dbClient from '../loaders/database';
import { taskListSchema, taskSchema, getTaskSchema } from '../shared/schemas';

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

export const getTaskList = async (body: getTaskSchema) => {
  const db = (await dbClient()).collection('tasklists');
  if ((await db.findOne({ $match: { _id: ObjectId(body.taskListID) } })) === null) {
    throw { code: 404, message: 'Task List does not exist for this id' };
  }

  const taskDB = (await dbClient()).collection('tasks');

  const page = body.pageNumber;
  const limit = body.limit;
  const skipIndex = (page - 1) * limit;
  const result = await taskDB.find({ $match: { _id: ObjectId(body.taskListID) } }).toArray();
  return { totalTasks: result.length, ...result.slice(skipIndex, skipIndex + limit) };
};
