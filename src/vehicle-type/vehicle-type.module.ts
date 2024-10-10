import { Module } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';

@Module({
  providers: [VehicleTypeService],
  exports: [VehicleTypeService],
})
export class VehicleTypeModule {}
