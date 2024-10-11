import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleTypeService } from '../vehicle-type/vehicle-type.service';
import { VehicleResolver } from './vehicle.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from './vehicle.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Vehicle.name,
        schema: VehicleSchema,
      },
    ]),
  ],
  providers: [VehicleService, VehicleTypeService, VehicleResolver],
  exports: [VehicleService, VehicleResolver],
})
export class VehicleModule {}
