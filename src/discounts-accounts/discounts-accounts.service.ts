import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscountsAccounts } from './discounts-accounts.entity';

@Injectable()
export class DiscountsAccountsService {
  constructor(
    @InjectRepository(DiscountsAccounts)
    private readonly discountsAccounts: Repository<DiscountsAccounts>,
  ) {}
}
