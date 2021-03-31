import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdTypes } from './ad-types.entity';
import { AdTypesResolver } from './ad-types.resolver';
import { AdTypesService } from './ad-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdTypes])],
  providers: [AdTypesService, AdTypesResolver],
})
export class AdTypesModule {}
