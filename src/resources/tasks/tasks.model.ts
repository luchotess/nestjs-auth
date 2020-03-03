import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
    description : String,
    projectId   : String,
    parentTaskId: String,
    creator     : [String],
    assignee    : String,
    status      : String,
    deadline    : Object,
    subtasks    : [Object]
});

export type createTaskDto = {
    clientId: string,
    name: string,
    owners: string[],
    type: string,
    data: any
};

export type Task = createTaskDto;
