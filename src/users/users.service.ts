import { Injectable }  from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model }       from 'mongoose';
import * as bcrypt from 'bcrypt';


export type User = any;
export type CreateUserDto = {
    username: string;
    password: string;
    role: string;
    name: string;
};

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor (@InjectModel('User') private readonly userModel: Model<User>) {
        this.users = [
            {
                userId  : 1,
                username: 'john',
                password: 'changeme'
            },
            {
                userId  : 2,
                username: 'chris',
                password: 'secret'
            },
            {
                userId  : 3,
                username: 'maria',
                password: 'guess'
            }
        ];
    }

    async findOne (username: string): Promise<User | undefined> {
        return this.userModel.findOne({username});
    }

    async create (createUserDto: CreateUserDto): Promise<User> {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async delete (id: string): Promise<User> {
        return await this.userModel.findByIdAndDelete(id);
    }

    async findAll (): Promise<User[]> {
        return this.userModel.find().exec();
    }
}
