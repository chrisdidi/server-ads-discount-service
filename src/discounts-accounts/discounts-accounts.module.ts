import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountsAccountsResolver } from './discounts-accounts.resolver';
import { DiscountsAccounts } from './discounts-accounts.entity';
import { DiscountsAccountsService } from './discounts-accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountsAccounts])],
  providers: [DiscountsAccountsService, DiscountsAccountsResolver],
})
export class DiscountsAccountsModule {}
