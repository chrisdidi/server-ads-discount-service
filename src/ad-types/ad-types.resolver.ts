import { Resolver, Query } from '@nestjs/graphql';
import { AdTypes } from './ad-types.entity';
import { AdTypesService } from './ad-types.service';
import { AllAdTypesOutput } from './dtos/all-ad-types.dto';

@Resolver(of => AdTypes)
export class AdTypesResolver {
  constructor(private readonly adTypesService: AdTypesService) {}

  @Query(returns => AllAdTypesOutput)
  async allAdTypes() {
    return this.adTypesService.find();
  }
}
