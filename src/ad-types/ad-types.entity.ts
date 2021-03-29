import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/core.entity';
import { DiscountsAccounts } from 'src/discounts-accounts/discounts-accounts.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@InputType('AdTypesType', { isAbstract: true })
@ObjectType()
@Entity()
export class AdTypes extends CoreEntity {
  @Column()
  @Field()
  name: string;

  @Column({ type: 'float' })
  @Field()
  price: number;

  @Column()
  @Field()
  description: string;

  @Field(type => [DiscountsAccounts], { nullable: true })
  @OneToMany(
    type => DiscountsAccounts,
    discount => discount.adType,
    { nullable: true },
  )
  discounts?: DiscountsAccounts[];

  @Field(type => [DiscountsAccounts], { nullable: true })
  @OneToMany(
    type => DiscountsAccounts,
    discount => discount.freeAd,
    { nullable: true },
  )
  discountsFree?: DiscountsAccounts[];
}
