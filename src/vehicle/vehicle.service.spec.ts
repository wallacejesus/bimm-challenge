import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from './vehicle.service';
import { Vehicle, VehicleSchema } from './vehicle.entity';
import { ResponseDTO } from '../dtos/response-dto.entity';
import { VehicleMakesDTO } from '../dtos/vehicle-makes-dto.entity';
import { VehicleTypeService } from '../vehicle-type/vehicle-type.service';
import { DatabaseService } from '../database/database.service';
import { MongooseModule } from '@nestjs/mongoose';

describe('VehicleService', () => {
  let service: VehicleService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGODB_URL ?? 'mongodb://localhost:27017/bimm'),
        MongooseModule.forFeature([{
        name: Vehicle.name,
        schema: VehicleSchema
      }])],
      providers: [VehicleService, VehicleTypeService, DatabaseService<Vehicle>],
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

  it('must produce and get a JSON with all makes and vehicle types ', async () => {
    jest.spyOn(service, 'updateDatabase').mockResolvedValue([
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
    const vehicleMakes = await service.updateDatabase();
    expect(vehicleMakes).toBeInstanceOf(Array<Vehicle>);
  });
  it('must update database with json reading of xml', async () => {
    jest.spyOn(service,'updateDB').mockResolvedValue();
    const result = await service.updateDB();
    expect(result).toBeUndefined();
  });

  it('must find all vehicle saved in datastore', async () => {
    jest.spyOn(service,'findAll').mockResolvedValue([
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

  it('must find single vehicle by makeId', async() => {
    jest.spyOn(service,'findById').mockResolvedValue(
      {
        makeId: '1',
        makeName: 'Make test',
        vehicleTypes: [
          {
            typeId: '1',
            typeName: 'Type test',
          },
        ],
      } as Vehicle
    );
    const result = await service.findById('1');
    expect(result.makeId).toBe('1');
  });
});
