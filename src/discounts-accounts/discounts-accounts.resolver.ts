import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DiscountsAccounts } from './discounts-accounts.entity';
import { DiscountsAccountsService } from './discounts-accounts.service';
import { UpdateCartInput, UpdateCartOutput } from './dto/update-cart.dto';

@Resolver(of => DiscountsAccounts)
export class DiscountsAccountsResolver {
  constructor(
    private readonly discountsAccountsService: DiscountsAccountsService,
  ) {}

  @Mutation(returns => UpdateCartOutput)
  async updateCart(@Args('input') input: UpdateCartInput) {
    console.log(input);
    return this.discountsAccountsService.updateCart(input);
  }
}
