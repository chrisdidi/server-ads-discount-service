import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdAccounts } from './ad-accounts.entity';
import { MyAdAccountsOutput } from './dtos/my-ad-accounts.dto';

@Injectable()
export class AdAccountsService {
  constructor(
    @InjectRepository(AdAccounts)
    private readonly adAccounts: Repository<AdAccounts>,
  ) {}

  async getMyAdAccounts(): Promise<MyAdAccountsOutput> {
    try {
      const data = await this.adAccounts.find({
        select: ['id', 'name'],
        relations: ['discounts', 'discounts.adType', 'discounts.freeAd'],
      });
      return {
        data,
      };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
