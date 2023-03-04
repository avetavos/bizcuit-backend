import { Module } from '@nestjs/common';
import { BeersService } from './beers.service';
import { BeersController } from './beers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Beer, BeerSchema } from 'src/schemas/beer.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Beer.name, schema: BeerSchema }]),
  ],
  providers: [BeersService],
  controllers: [BeersController],
})
export class BeersModule {}
