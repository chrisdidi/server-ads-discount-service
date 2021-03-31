import { Resolver } from '@nestjs/graphql';
import { DiscountsAccounts } from './discounts-accounts.entity';
import { DiscountsAccountsService } from './discounts-accounts.service';

@Resolver(of => DiscountsAccounts)
export class DiscountsAccountsResolver {
  constructor(
    private readonly discountsAccountsService: DiscountsAccountsService,
  ) {}
}
