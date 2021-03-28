import { Resolver, Query } from '@nestjs/graphql';
import { AdAccounts } from './ad-accounts.entity';
import { MyAdAccountsOutput } from './dtos/ad-accounts.dto';

@Resolver(of => AdAccounts)
export class AdAccountsResolver {
  @Query(returns => [MyAdAccountsOutput])
  async myAdAccounts() {
    return [
      {
        name: 'Hello!',
      },
    ];
  }
}
