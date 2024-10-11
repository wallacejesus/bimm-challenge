import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from './vehicle.service';
import { Vehicle, VehicleSchema } from './vehicle.entity';
import { ResponseDTO } from '../dtos/response-dto.entity';
import { VehicleMakesDTO } from '../dtos/vehicle-makes-dto.entity';
import { VehicleTypeService } from '../vehicle-type/vehicle-type.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('VehicleService', () => {
  let service: VehicleService;
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
      providers: [VehicleService, VehicleTypeService],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('must get all makes', async () => {
    jest.spyOn(service, 'getAllMakes').mockResolvedValue({
      Count: 1,
      Message: 'Response successfully',
      Results: [
        {
          Make_ID: 1,
          Make_Name: 'Make test',
        },
      ],
    });
    const result =
      (await service.getAllMakes()) as ResponseDTO<VehicleMakesDTO>;
    expect(result).toBeDefined();
  });

  it('must update database with json reading of xml', async () => {
    jest.spyOn(service, 'updateDatabase').mockResolvedValue();
    const result = await service.updateDatabase();
    expect(result).toBeUndefined();
  });

  it('must find all vehicle saved in datastore', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([
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
    const result = await service.findAll();
    expect(result[0].makeId).toBe('1');
  });

  it('must find single vehicle by makeId', async () => {
    jest.spyOn(service, 'findById').mockResolvedValue({
      makeId: '1',
      makeName: 'Make test',
      vehicleTypes: [
        {
          typeId: '1',
          typeName: 'Type test',
        },
      ],
    } as Vehicle);
    const result = await service.findById('1');
    expect(result.makeId).toBe('1');
  });
});
