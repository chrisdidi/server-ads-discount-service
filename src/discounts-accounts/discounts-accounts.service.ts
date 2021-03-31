import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscountsAccounts } from './discounts-accounts.entity';
import { UpdateCartInput, UpdateCartOutput } from './dto/update-cart.dto';

@Injectable()
export class DiscountsAccountsService {
  constructor(
    @InjectRepository(DiscountsAccounts)
    private readonly discountsAccounts: Repository<DiscountsAccounts>,
  ) {}

  async updateCart(input: UpdateCartInput): Promise<UpdateCartOutput> {
    try {
      console.log(input);
      let cart = [];
      return {
        data: {
          cart,
          price: 0,
        },
      };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
