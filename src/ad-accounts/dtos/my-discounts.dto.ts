import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.entity';
import { AdAccounts } from '../ad-accounts.entity';

@ArgsType()
export class MyDiscountsInput {
  @Field()
  id: number;
}

@ObjectType()
export class MyDiscountsOutput extends CoreOutput {
  @Field(type => AdAccounts)
  data: AdAccounts;
}
