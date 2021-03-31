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
      //Try add the ads to cart first
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
            originalPrice: 0,
            discountedPrice: 0,
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

      let totalQuantity = 0;
      Object.keys(cart).map(a => {
        //reassure that the price stored locally on client is up to date with database's prices
        totalQuantity = totalQuantity + cart[a].quantity;
        cart[a].price = ads[cart[a].id].price;
        price = price + ads[cart[a].id].price * cart[a].quantity;
      });

      //once item is added to cart, try calculate the discount

      const discountsData = await this.discountsAccounts
        .createQueryBuilder('discounts_accounts')
        .where(
          `discounts_accounts."accountId" = :accountId AND discounts_accounts."min_purchase" <= :totalQuantity`,
          { accountId, totalQuantity },
        )
        .leftJoinAndSelect('discounts_accounts.adType', 'adType')
        .leftJoinAndSelect('discounts_accounts.freeAd', 'freeAd')
        .getMany();

      let discountedPrice = 0;
      let discountedCart = JSON.parse(JSON.stringify(cart));
      if (discountsData.length > 0) {
        for (let i = 0; i < discountsData.length; i++) {
          let curItem = discountedCart[discountsData[i].adType.id];
          if (!Boolean(curItem)) {
            continue;
          }
          if (
            curItem.quantity >= discountsData[i].min_purchase &&
            discountsData[i].newPrice !== null
          ) {
            curItem.price = discountsData[i].newPrice;
          }
          if (
            totalQuantity >= discountsData[i].min_purchase &&
            discountsData[i].freeAd !== null
          ) {
            const extra = totalQuantity - discountsData[i].min_purchase;
            const canFree =
              extra > discountedCart[discountsData[i].adType.id]?.quantity
                ? discountedCart[discountsData[i].adType.id].quantity
                : extra;
            curItem.quantity = curItem.quantity - canFree;
            totalQuantity = totalQuantity - canFree;

            discountedCart[discountsData[i].adType.id] = curItem;
          }
        }
      }

      Object.keys(discountedCart).map(a => {
        discountedPrice =
          discountedPrice +
          discountedCart[a].price * discountedCart[a].quantity;
      });

      return {
        data: {
          cart: Object.values(cart),
          originalPrice: price,
          discountedPrice,
        },
      };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
