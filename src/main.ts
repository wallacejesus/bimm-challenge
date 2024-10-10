import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VehicleService } from './vehicle/vehicle.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const vehicle = app.get(VehicleService);
  console.log('updating database...')
  vehicle.updateDB();
  console.log('Database updated')
  await app.listen(3000);
}
bootstrap();
