import { Model } from 'mongoose';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

@Injectable()
export class BaseDto {
    constructor (private readonly model: Model<any>) {}

    requiredFields: string[] = [];

    async create (createDTO: any): Promise<any> {
        const missingFields = this.requiredFields.filter(field => {
            return !createDTO.hasOwnProperty(field);
        });

        if (missingFields.length > 0) {
            throw new HttpException({
                error: `Missing required fields: ${missingFields}`
            }, HttpStatus.BAD_REQUEST);
        }
        const created = new this.model(createDTO);
        return created.save();
    }

    async findAll (): Promise<any[]> {
        return await this.model.find().exec();
    }

    async findOne (condition): Promise<any> {
        return await this.model.findOne(condition).exec();
    }

    async update (_id: string, DTO: any): Promise<any> {
        return await this.model.findOneAndUpdate({_id}, DTO, {new: true}).exec();
    }

    async delete (_id: string): Promise<any> {
        const deleted = await this.model.findOneAndDelete({_id}).exec();

        if (deleted) {
            return {
                success: true,
                deleted: deleted._id
            };
        } else {
            throw new HttpException({error: 'Error deleting from the database.'}, HttpStatus.BAD_REQUEST);
        }
    }
}
