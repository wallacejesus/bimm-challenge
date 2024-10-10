import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleTypeService } from '../vehicle-type/vehicle-type.service';
import { VehicleResolver } from './vehicle.resolver';
import { DatabaseService } from '../database/database.service';

@Module({
  providers: [VehicleService, VehicleTypeService, DatabaseService, VehicleResolver],
  exports: [VehicleService, VehicleResolver],
})
export class VehicleModule {}
