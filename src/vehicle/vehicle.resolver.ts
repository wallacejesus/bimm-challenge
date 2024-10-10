import { Resolver, Query, Args } from '@nestjs/graphql';
import { Vehicle } from './vehicle.entity';
import { VehicleService } from './vehicle.service';


@Resolver(() => Vehicle)
export class VehicleResolver {
    constructor(private readonly vehicleService: VehicleService){
    }
    @Query(() => [Vehicle], { name: 'vehicles'})
    async findAll() : Promise<Vehicle[]>{
        return this.vehicleService.findAll();
    }
    @Query(() => Vehicle, { name: 'vehicle'})
    async findById(@Args('makeId') makeId: string) : Promise<Vehicle>{
        return this.vehicleService.findById(makeId);
    }
}
