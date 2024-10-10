import { Test, TestingModule } from '@nestjs/testing';
import { VehicleResolver } from './vehicle.resolver';
import { VehicleService } from './vehicle.service';
import { VehicleTypeService } from '../vehicle-type/vehicle-type.service';
import { DatabaseService } from '../database/database.service';
import { Vehicle } from './vehicle.entity';

describe('VehicleResolver', () => {
  let resolver: VehicleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleResolver, VehicleService, VehicleTypeService, DatabaseService<Vehicle>]
    }).compile();

    resolver = module.get<VehicleResolver>(VehicleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('must find all vehicle saved in datastore', () => {
    jest.spyOn(resolver,'findAll').mockReturnValue([
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
    const result = resolver.findAll();
    expect(result[0].makeId).toBe('1');
  });
});
