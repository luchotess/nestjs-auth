import { Injectable }  from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model }   from 'mongoose';
import { BaseDto } from 'src/core/database/base.dto';
import { User }    from 'src/resources/users/users.model';
import { Client }  from '../clients/clients.model';

@Injectable()
export class UsersService extends BaseDto {
    requiredFields = ["firstName", "lastName", "username", "password"];

    constructor (@InjectModel('User') private readonly userModel: Model<User>,
                 @InjectModel('Client') private readonly clientModel: Model<Client>) {
        super(userModel);
    }

    async getUserClients (userId: string): Promise<Client[]> {
        return await this.clientModel.find({
            owners: userId
        }).exec();
    }
}
