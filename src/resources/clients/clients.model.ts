import * as mongoose from 'mongoose';

export const ClientSchema = new mongoose.Schema({
    name : String,
    owners: [String],
    type : String,
    data: Object
});

export type CreateClientDto = {
    name: string,
    owners: string[],
    type: string,
    data: any
};

export type Client = CreateClientDto;
