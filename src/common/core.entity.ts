import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field(type => Number)
  id: number;

  @CreateDateColumn()
  @Field(type => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(type => Date)
  updatedAt: Date;
}

@ObjectType()
export class CoreOutput {
  @Field(type => Number, { nullable: true })
  currentPage?: number;

  @Field(type => Number, { nullable: true })
  itemCount?: number;

  @Field(type => Number, { nullable: true })
  pageCount?: number;

  @Field(type => Number, { nullable: true })
  perPage?: number;

  @Field(type => Boolean, { nullable: true })
  hasNextPage?: boolean;

  @Field(type => Boolean, { nullable: true })
  hasPrevPage?: boolean;

  @Field(type => String, { nullable: true })
  error?: string;
}
