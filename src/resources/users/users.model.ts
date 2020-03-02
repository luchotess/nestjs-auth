import { HttpException, HttpStatus } from '@nestjs/common';
import * as mongoose                 from 'mongoose';
import * as bcrypt                   from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
    firstName: String,
    lastName: String,
});

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.hashPassword = async function (password = null) {
    this.password = await bcrypt.hash(password ? password : this.password, 10);
};

UserSchema.methods.serialize = async function () {
    return {
        _id: this._id,
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        role: this.role
    };
};

UserSchema.pre('save', async function (next) {
    if (this.isNew) {
        await this.hashPassword();
    }
    next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
    const data = this.getUpdate();

    if (data.password) {
        throw new HttpException({
            error: 'Error updating user',
            message: `Can't change password on update process.`
        }, HttpStatus.BAD_REQUEST);
    }
    next();
});

export type CreateUserDto = {
    username: string;
    password: string;
    role: string;
    firstName: string;
    lastName: string;
};

export type User = any;
