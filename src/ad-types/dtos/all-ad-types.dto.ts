import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/core.entity';
import { AdTypes } from '../ad-types.entity';

@ObjectType()
export class AllAdTypesOutput extends CoreOutput {
  @Field(type => [AdTypes])
  data: AdTypes[];
}
