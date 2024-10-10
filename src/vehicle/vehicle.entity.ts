import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VehicleType } from '../vehicle-type/vehicle-type.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class Vehicle {
  @Field(() => ID)
  @Prop({required: true})
  makeId: string;
  @Field(() => String)
  @Prop({required: true})
  makeName: string;
  @Field(() => [VehicleType])
  @Prop()
  vehicleTypes: VehicleType[];
}
export type VehicleDocument = Vehicle & Document;
export const VehicleSchema = SchemaFactory.createForClass(Vehicle);