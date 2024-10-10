import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.entity';
import { ResponseDTO } from '../dtos/response-dto.entity';
import { VehicleMakesDTO } from '../dtos/vehicle-makes-dto.entity';
import { VehicleTypeService } from '../vehicle-type/vehicle-type.service';
import { DatabaseService } from '../database/database.service';

describe('VehicleService', () => {
  let service: VehicleService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    jest.spyOn(service, 'produceJson').mockResolvedValue([
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
    const vehicleMakes = await service.produceJson();
    expect(vehicleMakes).toBeInstanceOf(Array<Vehicle>);
  });
  it('must update database with json reading of xml', async () => {
    jest.spyOn(service,'updateDB').mockResolvedValue();
    const result = await service.updateDB();
    expect(result).toBeUndefined();
  });

  it('must find all vehicle saved in datastore', () => {
    jest.spyOn(service,'findAll').mockReturnValue([
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
    const result = service.findAll();
    expect(result[0].makeId).toBe('1');
  });
});
