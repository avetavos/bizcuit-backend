import { Body, Controller, Get, Post } from '@nestjs/common';
import { BeersService } from './beers.service';
import { CreateBeerDto } from './dtos/create-beer.dto';

@Controller('beers')
export class BeersController {
  constructor(private readonly beersService: BeersService) {}

  @Post()
  async createBeer(@Body() payload: CreateBeerDto) {
    return await this.beersService.createNewBeer(payload);
  }

  @Get('/random_beer')
  async getBeers() {
    return await this.beersService.getRandomBeer();
  }
}
