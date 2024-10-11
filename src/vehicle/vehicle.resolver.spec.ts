import { Test, TestingModule } from '@nestjs/testing';
import { VehicleResolver } from './vehicle.resolver';
import { VehicleService } from './vehicle.service';
import { VehicleTypeService } from '../vehicle-type/vehicle-type.service';
import { Vehicle, VehicleSchema } from './vehicle.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('VehicleResolver', () => {
  let resolver: VehicleResolver;

  beforeAll(async () => {
    const mongodb = MongoMemoryServer.create();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          process.env.MONGODB_URL ?? (await mongodb).getUri(),
        ),
        MongooseModule.forFeature([
          {
            name: Vehicle.name,
            schema: VehicleSchema,
          },
        ]),
      ],
      providers: [VehicleResolver, VehicleService, VehicleTypeService],
    }).compile();

    resolver = module.get<VehicleResolver>(VehicleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('must find all vehicle saved in datastore', async () => {
    jest.spyOn(resolver, 'findAll').mockResolvedValue([
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
    jest.spyOn(resolver, 'findById').mockResolvedValue({
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
