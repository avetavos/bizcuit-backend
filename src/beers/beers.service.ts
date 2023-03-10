import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosError } from 'axios';
import { Model } from 'mongoose';
import { catchError, firstValueFrom } from 'rxjs';
import { Beer, BeerDocument } from 'src/schemas/beer.schema';
import { RawBeer } from './interfaces/raw-beer.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateBeerDto } from './dtos/create-beer.dto';

@Injectable()
export class BeersService {
  private seedSize = 100;
  private ibuUnit = ' IBU';
  private alcoholUnit = '%';
  private blgUnit = '°Blg';
  private readonly logger = new Logger(BeersService.name);
  constructor(
    @InjectModel(Beer.name) private beerModel: Model<BeerDocument>,
    private readonly httpService: HttpService,
  ) {}

  private async fetchBeers() {
    const { data } = await firstValueFrom(
      this.httpService
        .get<RawBeer[]>(
          `https://random-data-api.com/api/beer/random_beer?size=${this.seedSize}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async seed() {
    const existsBeers = await this.beerModel.find().exec();
    if (existsBeers.length) {
      return;
    }
    const beers = await this.fetchBeers();
    for await (const beer of beers) {
      const ibu = beer.ibu.replace(this.ibuUnit, '');
      const alcohol = beer.alcohol.replace(this.alcoholUnit, '');
      const blg = beer.blg.replace(this.blgUnit, '');

      const data: Beer = {
        uid: beer.uid,
        brand: beer.brand,
        name: beer.name,
        style: beer.style,
        hop: beer.hop,
        yeast: beer.yeast,
        malts: beer.malts,
        ibu: +ibu,
        alcohol: +alcohol,
        blg: +blg,
        randomCount: 0,
      };
      const newBeer = new this.beerModel(data);
      await newBeer.save();
    }
  }

  async getRandomBeer() {
    const [beer] = await this.beerModel.aggregate([{ $sample: { size: 1 } }]);
    await this.updateRandomCount(beer.uid);
    beer.randomCount++;
    return beer;
  }

  private async updateRandomCount(uid: string) {
    await this.beerModel.updateOne({ uid }, { $inc: { randomCount: 1 } });
  }

  async createNewBeer(payload: CreateBeerDto) {
    const uid = uuidv4();
    const newBeer = new this.beerModel({
      uid,
      ...payload,
    });
    return await newBeer.save();
  }

  async getBeerById(id: string) {
    const beer = await this.beerModel.findById(id).exec();
    if (!beer) {
      throw new NotFoundException('Beer not found!');
    }
    return beer;
  }
}
