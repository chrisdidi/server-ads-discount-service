import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdTypes } from './ad-types.entity';
import { AllAdTypesOutput } from './dtos/all-ad-types.dto';

@Injectable()
export class AdTypesService {
  constructor(
    @InjectRepository(AdTypes) private readonly adTypes: Repository<AdTypes>,
  ) {}

  async find(): Promise<AllAdTypesOutput> {
    try {
      const data = await this.adTypes.find();
      return { data };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
