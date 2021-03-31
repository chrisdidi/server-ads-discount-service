import { Resolver, Query, Args } from '@nestjs/graphql';
import { AdAccounts } from './ad-accounts.entity';
import { AdAccountsService } from './ad-accounts.service';
import { MyAdAccountsOutput } from './dtos/my-ad-accounts.dto';
import { MyDiscountsInput, MyDiscountsOutput } from './dtos/my-discounts.dto';

@Resolver(of => AdAccounts)
export class AdAccountsResolver {
  constructor(private readonly adAccountsService: AdAccountsService) {}
  @Query(returns => MyAdAccountsOutput)
  async myAdAccounts() {
    return this.adAccountsService.getMyAdAccounts();
  }

  @Query(returns => MyDiscountsOutput)
  async myDiscounts(@Args() args: MyDiscountsInput) {
    return this.adAccountsService.myDiscounts(args.id);
  }
}
