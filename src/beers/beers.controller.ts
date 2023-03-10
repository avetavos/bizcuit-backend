import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('/:id')
  async getBeerById(@Param('id') id: string) {
    return await this.beersService.getBeerById(id);
  }
}
