import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Vehicle, VehicleDocument } from './vehicle.entity';
import { XMLParser } from 'fast-xml-parser';
import { VehicleType } from '../vehicle-type/vehicle-type.entity';
import { VehicleTypeService } from '../vehicle-type/vehicle-type.service';
import { ResponseDTO } from '../dtos/response-dto.entity';
import { VehicleMakesDTO } from '../dtos/vehicle-makes-dto.entity';
import { DatabaseService } from '../database/database.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class VehicleService {
  constructor(
    private readonly vehicleTypeService: VehicleTypeService,
    private readonly databaseService: DatabaseService<Vehicle>,
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
  ) {}
  private xmlParser = new XMLParser();
  public async updateDB(): Promise<void> {
    const vehicles = await this.updateDatabase()
    this.databaseService.setCollection('vehicles', vehicles);
  }

  public async getAllMakes(): Promise<ResponseDTO<VehicleMakesDTO>> {
    const result = await axios.get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML`,
      {
        params: {
          'Content-Type': 'text/xml',
        },
      },
    );
    const response = this.xmlParser.parse(result.data)?.Response;
    return {
      Count: response.Count,
      Message: response.Message,
      Results: response.Results.AllVehicleMakes,
    } as ResponseDTO<VehicleMakesDTO>;
  }

  public async updateDatabase(): Promise<Vehicle[]> {
    const result = await this.getAllMakes();

    const vehicles: Vehicle[] = [];
    for (const vehicle of result.Results) {
      const responseVehicleTypes =
        await this.vehicleTypeService.getAllVehicleTypesPerMake(
          vehicle.Make_ID,
        )
      await this.vehicleModel.updateOne(
        {makeId: vehicle.Make_ID},
        {
          $set: {
            makeId: vehicle.Make_ID.toString(),
            makeName: vehicle.Make_Name,
            vehicleTypes: responseVehicleTypes
            .Results
            .filter(p => p?.VehicleTypeId !== undefined)
            .map((p): VehicleType => {
              return {
                typeId: p.VehicleTypeId.toString(),
                typeName: p.VehicleTypeName,
              };
            }),
          }
        },
        {upsert: true}
      );
      
    }

    return vehicles;
  }
  public async findAll() : Promise<Vehicle[]>{
    return await this.vehicleModel.find()
  }

  public async findById(makeId: string): Promise<Vehicle>{
    return await this.vehicleModel.findOne({makeId});
  }
}
