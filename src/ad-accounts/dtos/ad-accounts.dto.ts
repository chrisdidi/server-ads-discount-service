import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MyAdAccountsOutput {
  @Field()
  name: string;
}
