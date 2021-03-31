import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdTypes } from 'src/ad-types/ad-types.entity';
import { Repository } from 'typeorm';
import { DiscountsAccounts } from './discounts-accounts.entity';
import { UpdateCartInput, UpdateCartOutput } from './dto/update-cart.dto';

@Injectable()
export class DiscountsAccountsService {
  constructor(
    @InjectRepository(DiscountsAccounts)
    private readonly discountsAccounts: Repository<DiscountsAccounts>,
    @InjectRepository(AdTypes)
    private readonly adTypes: Repository<AdTypes>,
  ) {}

  async updateCart({
    accountId,
    adId,
    currentCart,
    quantity,
  }: UpdateCartInput): Promise<UpdateCartOutput> {
    try {
      //Try add the ADS to cart first, an ad may have been deleted
      //This attempt assumes that security is handled elsewhere, in reality, cart data should be stored in database or there should be logic to check each ads prices against the database to ensure the integrity of data.
      let price = 0;
      let cart = {};
      let ads = {};
      const allAds = await this.adTypes.find();

      allAds.map(a => (ads[a.id] = a));
      currentCart.map(a => (cart[a.id] = a));

      const ad = ads[adId];
      if (!Boolean(ad)) {
        return {
          data: {
            cart: [],
            price: 0,
          },
          error: 'The ad may have expired! Refresh and try again!',
        };
      }

      if (quantity === 0) {
        delete cart[adId];
      } else {
        cart[adId] = {
          id: ad.id,
          name: ad.name,
          price: ad.price,
          quantity,
        };
      }

      Object.keys(cart).map(a => {
        cart[a].price = ads[cart[a].id].price;
        price = price + ads[cart[a].id].price * cart[a].quantity;
      });

      //once item is added to cart, try calculate the discount

      // let totalQuantity = 0;
      // price = 0;
      // currentCart.map(a => {
      //   totalQuantity = totalQuantity + a.quantity;
      //   return (price = price + a.price * a.quantity);
      // });

      // const discountsData = await this.discountsAccounts
      //   .createQueryBuilder('discounts_accounts')
      //   .where(
      //     `discounts_accounts."accountId" = :accountId AND discounts_accounts."min_purchase" <= :totalQuantity`,
      //     { accountId, totalQuantity },
      //   )
      //   .leftJoinAndSelect('discounts_accounts.adType', 'adType')
      //   .leftJoinAndSelect('discounts_accounts.freeAd', 'freeAd')
      //   .getMany();

      // if (discountsData.length > 0) {
      //   discountsData.map(discount => {});
      // }

      return {
        data: {
          cart: Object.values(cart),
          price: price,
        },
      };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
