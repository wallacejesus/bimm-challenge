import { Test, TestingModule } from '@nestjs/testing';
import { VehicleTypeService } from './vehicle-type.service';

describe('VehicleTypeService', () => {
  let service: VehicleTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleTypeService],
      exports: [VehicleTypeService],
    }).compile();

    service = module.get<VehicleTypeService>(VehicleTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('must get all vehicle types per make', async () => {
    jest.spyOn(service, 'getAllVehicleTypesPerMake').mockResolvedValue({
      Count: 2,
      Message: 'Response sucessfully',
      Results: [
        {
          VehicleTypeId: 1,
          VehicleTypeName: 'Vehicle Type test 1',
        },
        {
          VehicleTypeId: 2,
          VehicleTypeName: 'Vehicle Type test 2',
        },
      ],
    });
    const makeId = 440;
    const result = await service.getAllVehicleTypesPerMake(makeId);
    expect(result).toBeDefined();
    expect(result.Count).toBe(result.Results.length);
  });
});
