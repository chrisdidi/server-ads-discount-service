import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MyAdAccountsOutput {
  @Field(type => String)
  name?: string;
}
