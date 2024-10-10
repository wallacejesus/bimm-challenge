import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleModule } from './vehicle/vehicle.module';

import { VehicleTypeModule } from './vehicle-type/vehicle-type.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DatabaseService } from './database/database.service';


@Module({
  imports: [
    VehicleModule,
    VehicleTypeModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    })
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
