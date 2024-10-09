import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { VehicleService } from './vehicle/vehicle.service';

@Controller()
export class AppController implements OnModuleInit{
  constructor(
    private readonly appService: AppService,
    private readonly vehicleService: VehicleService
   
  ) {}
  onModuleInit() {
    this.vehicleService.updateDB();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
