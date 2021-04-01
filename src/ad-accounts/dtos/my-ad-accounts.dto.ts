import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.entity';
import { AdAccounts } from '../ad-accounts.entity';

@ObjectType()
export class MyAdAccountsOutput extends CoreOutput {
  @Field(type => [AdAccounts])
  data: AdAccounts[];
}
