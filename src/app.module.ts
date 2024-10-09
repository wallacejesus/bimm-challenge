import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { VehicleService } from './vehicle/vehicle.service';

@Module({
  imports: [VehicleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
