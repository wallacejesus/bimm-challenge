import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class VehicleType {
  @Field(() => ID)
  typeId: string;
  @Field(() => String)
  typeName: string;
}
