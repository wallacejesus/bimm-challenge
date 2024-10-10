import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema()
export class VehicleType {
  @Field(() => ID)
  @Prop({require: true})
  typeId: string;
  @Field(() => String)
  @Prop()
  typeName: string;
}
export type VehicleTypeDocument = VehicleType & Document;
export const VehicleTypeSchema = SchemaFactory.createForClass(VehicleType);