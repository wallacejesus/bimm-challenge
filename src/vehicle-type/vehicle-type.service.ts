import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { ResponseDTO } from '../dtos/response-dto.entity';
import { VehicleTypesDTO } from '../dtos/vehicle-types-dto.entity';

@Injectable()
export class VehicleTypeService {
  private xmlParser = new XMLParser();
  public async getAllVehicleTypesPerMake(
    makeId: number,
  ): Promise<ResponseDTO<VehicleTypesDTO>> {
   const result = await axios.get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`,
      {
        params: {
          'Content-Type': 'text/xml',
        },
      },
    );
    
    const response = this.xmlParser.parse(result.data)?.Response;
    return {
      ...response,
      Results:
        response?.Results?.VehicleTypesForMakeIds?.length > 1
          ? response.Results.VehicleTypesForMakeIds
          : [response.Results.VehicleTypesForMakeIds],
    };
    
  }
}
