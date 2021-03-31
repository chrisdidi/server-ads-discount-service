import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IS_NOT_EMPTY_OBJECT } from 'class-validator';
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
      console.log(data);
      return { data };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
