import { Injectable }  from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model }   from 'mongoose';
import { BaseDto } from 'src/core/database/base.dto';
import { Client }  from './clients.model';

@Injectable()
export class ClientsService extends BaseDto {
    requiredFields = ['name', 'owners', 'type'];

    constructor (@InjectModel('Client') private readonly clientModel: Model<Client>) {
        super(clientModel);
    }
}
