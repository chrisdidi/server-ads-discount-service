import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/core.entity';
import { Column, Entity } from 'typeorm';

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class AdAccounts extends CoreEntity {
  @Column()
  @Field()
  name: string;
}
