import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AdAccounts } from 'src/ad-accounts/ad-accounts.entity';
import { AdTypes } from 'src/ad-types/ad-types.entity';
import { CoreEntity } from 'src/common/core.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';

@InputType('AdTypesType', { isAbstract: true })
@ObjectType()
@Entity()
@Unique('account-ad', ['adType', 'account'])
export class DiscountsAccounts extends CoreEntity {
  @Field(type => AdAccounts)
  @ManyToOne(
    type => AdAccounts,
    account => account.discounts,
  )
  account: AdAccounts;

  @Field(type => AdTypes)
  @ManyToOne(
    type => AdTypes,
    adTypes => adTypes.discounts,
    { nullable: true },
  )
  adType: AdTypes;

  @Column({ default: 0 })
  @Field(type => Number)
  min_purchase: number;

  @Column({ type: 'float', nullable: true })
  @Field(type => Number, { nullable: true })
  newPrice: Number;

  @Field(type => AdTypes, { nullable: true })
  @ManyToOne(
    type => AdTypes,
    adTypes => adTypes.discountsFree,
    { nullable: true },
  )
  freeAd?: AdTypes;

  @Column({ default: 0 })
  @Field(type => Number)
  freeQuantity: number;
}
