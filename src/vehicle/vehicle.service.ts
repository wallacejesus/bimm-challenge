import { Injectable } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class VehicleService {
    public async updateDB(): Promise<void>{
       console.log('Database updated!!!');
    }
}
