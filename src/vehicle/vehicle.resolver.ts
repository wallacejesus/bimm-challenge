import { Resolver, Query } from '@nestjs/graphql';
import { Vehicle } from './vehicle.entity';
import { VehicleService } from './vehicle.service';


@Resolver(() => Vehicle)
export class VehicleResolver {
    constructor(private readonly vehicleService: VehicleService){
        vehicleService.updateDB();
    }
    @Query(() => [Vehicle], { name: 'vehicles'})
    findAll() : Vehicle[]{
        return this.vehicleService.findAll();
    }
}
