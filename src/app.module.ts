import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdAccountsModule } from './ad-accounts/ad-accounts.module';
import { CommonModule } from './common/common.module';
import * as Joi from 'joi';
import { AdAccounts } from './ad-accounts/ad-accounts.entity';
import { AdTypesModule } from './ad-types/ad-types.module';
import { DiscountsAccountsModule } from './discounts-accounts/discounts-accounts.module';
import { AdTypes } from './ad-types/ad-types.entity';
import { DiscountsAccounts } from './discounts-accounts/discounts-accounts.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('production', 'development')
          .required(),
        DATABASE_URL: Joi.string(),
        DB_HOST: Joi.string(),
        DB_PORT: Joi.string(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(process.env.DATABASE_URL
        ? { url: process.env.DATABASE_URL }
        : {
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          }),
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
      entities: [AdAccounts, AdTypes, DiscountsAccounts],
    }),
    GraphQLModule.forRoot({
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: true,
    }),
    AdAccountsModule,
    CommonModule,
    AdTypesModule,
    DiscountsAccountsModule,
  ],
})
export class AppModule {}
