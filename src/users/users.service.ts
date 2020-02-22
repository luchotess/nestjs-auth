import { Injectable }  from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model }       from 'mongoose';
import { BaseDto }     from 'src/core/database/base.dto';
import { User }        from 'src/users/users.model';

@Injectable()
export class UsersService extends BaseDto {
    requiredFields = ["name", "username", "password"];

    constructor (@InjectModel('User') private readonly userModel: Model<User>) {
        super(userModel);
    }
}
