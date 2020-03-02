import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
    name    : String,
    code    : String,
    owners  : [String],
    clientId: String,
    type    : String,
    data    : Object,
    tasks   : [Object]
});

export type ProjectClientDto = {
    clientId: string,
    name: string,
    owners: string[],
    type: string,
    data: any
};

export type Project = ProjectClientDto;
