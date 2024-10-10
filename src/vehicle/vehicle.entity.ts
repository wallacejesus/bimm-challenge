import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VehicleType } from './vehicle-type.entity';

@ObjectType()
export class Vehicle {
  @Field(() => ID)
  makeId: string;
  @Field(() => String)
  makeName: string;
  @Field(() => [VehicleType])
  vehicleTypes: VehicleType[];
}
