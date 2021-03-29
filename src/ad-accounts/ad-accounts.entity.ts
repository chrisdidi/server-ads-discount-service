import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/core.entity';
import { DiscountsAccounts } from 'src/discounts-accounts/discounts-accounts.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class AdAccounts extends CoreEntity {
  @Column()
  @Field(type => String)
  name: string;

  @Field(type => [DiscountsAccounts], { nullable: true })
  @OneToMany(
    type => DiscountsAccounts,
    discounts => discounts.account,
  )
  discounts?: DiscountsAccounts[];
}
