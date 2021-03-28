import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdAccounts } from './ad-accounts.entity';
import { AdAccountsResolver } from './ad-accounts.resolver';
import { AdAccountsService } from './ad-accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdAccounts])],
  providers: [AdAccountsResolver, AdAccountsService],
})
export class AdAccountsModule {}
