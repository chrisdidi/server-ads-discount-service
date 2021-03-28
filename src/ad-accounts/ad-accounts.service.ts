import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdAccounts } from './ad-accounts.entity';
import { MyAdAccountsOutput } from './dtos/ad-accounts.dto';

@Injectable()
export class AdAccountsService {
  constructor(
    @InjectRepository(AdAccounts)
    private readonly adAccounts: Repository<AdAccounts>,
  ) {}

  async getMyAdAccounts(): Promise<MyAdAccountsOutput[]> {
    try {
      return await this.adAccounts.find({ select: ['name'] });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
