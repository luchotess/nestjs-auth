import {
    Request, Post,
    Get, Delete, Res
}                       from '@nestjs/common';
import { Response }     from 'express';

export class BaseController {
    constructor (private service: any) {}

    @Get()
    async getAll () {
        return await this.service.findAll();
    }

    @Get(':id')
    async getById (@Request() req) {
        return await this.service.findOne({_id: req.params.id});
    }

    @Post()
    async create (@Request() req, @Res() res: Response) {
        return res.status(201).json(await this.service.create(req.body));
    }

    @Delete(':id')
    async delete (@Request() req) {
        return await this.service.delete(req.params.id);
    }
}
