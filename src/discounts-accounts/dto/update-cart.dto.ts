import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { AdTypes } from 'src/ad-types/ad-types.entity';
import { CoreOutput } from 'src/common/core.entity';

@InputType()
class CartItemInput extends PickType(AdTypes, ['name', 'price', 'id']) {
  @Field(type => Int)
  quantity: number;
}

@ObjectType()
class CartItemOutput {
  @Field(type => Int)
  id: number;

  @Field(type => Number)
  price: number;

  @Field(type => String)
  name: string;

  @Field(type => Int)
  quantity: number;
}
@InputType()
export class UpdateCartInput {
  @Field(type => Int)
  accountId: number;

  @Field(type => [CartItemInput])
  currentCart: CartItemInput[];

  @Field(type => Int)
  adId: number;

  @Field(type => Int)
  quantity: number;
}

@ObjectType()
class OutputData {
  @Field(type => [CartItemOutput])
  cart: CartItemOutput[];

  @Field(type => Number)
  price: number;
}

@ObjectType()
export class UpdateCartOutput extends CoreOutput {
  @Field(type => OutputData, { nullable: true })
  data?: OutputData;
}
