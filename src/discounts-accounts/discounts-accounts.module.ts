import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountsAccountsResolver } from './discounts-accounts.resolver';
import { DiscountsAccounts } from './discounts-accounts.entity';
import { DiscountsAccountsService } from './discounts-accounts.service';
import { AdTypes } from 'src/ad-types/ad-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountsAccounts, AdTypes])],
  providers: [DiscountsAccountsService, DiscountsAccountsResolver],
})
export class DiscountsAccountsModule {}
