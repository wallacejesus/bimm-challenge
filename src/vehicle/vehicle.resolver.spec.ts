import { Test, TestingModule } from '@nestjs/testing';
import { VehicleResolver } from './vehicle.resolver';
import { VehicleService } from './vehicle.service';
import { VehicleTypeService } from '../vehicle-type/vehicle-type.service';
import { DatabaseService } from '../database/database.service';
import { Vehicle, VehicleSchema } from './vehicle.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

describe('VehicleResolver', () => {
  let resolver: VehicleResolver;
  
  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGODB_URL ?? 'mongodb://localhost:27017/bimm'),
        MongooseModule.forFeature([{
        name: Vehicle.name,
        schema: VehicleSchema
      }])],
      providers: [VehicleResolver, VehicleService, VehicleTypeService, DatabaseService<Vehicle>]
    }).compile();

    resolver = module.get<VehicleResolver>(VehicleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('must find all vehicle saved in datastore', async () => {
    jest.spyOn(resolver,'findAll').mockResolvedValue([
      {
        makeId: '1',
        makeName: 'Make test',
        vehicleTypes: [
          {
            typeId: '1',
            typeName: 'Type test',
          },
        ],
      },
    ]);
    const result = await resolver.findAll();
    expect(result[0].makeId).toBe('1');
  });
  it('must a single vehicle by id', async () => {
    jest.spyOn(resolver,'findById').mockResolvedValue({
      makeId: '1',
      makeName: 'Make test',
      vehicleTypes: [
        {
          typeId: '1',
          typeName: 'Type test',
        },
      ],
      });
    const result = await resolver.findAll();
    expect(result[0].makeId).toBe('1');
  });
});
