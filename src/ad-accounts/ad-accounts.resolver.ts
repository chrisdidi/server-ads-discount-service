import { Resolver, Query } from '@nestjs/graphql';
import { AdAccounts } from './ad-accounts.entity';
import { AdAccountsService } from './ad-accounts.service';
import { MyAdAccountsOutput } from './dtos/ad-accounts.dto';

@Resolver(of => AdAccounts)
export class AdAccountsResolver {
  constructor(private readonly adAccountsService: AdAccountsService) {}
  @Query(returns => MyAdAccountsOutput)
  async myAdAccounts() {
    return this.adAccountsService.getMyAdAccounts();
  }
}
