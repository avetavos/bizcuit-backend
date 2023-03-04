import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateBeerDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  style: string;

  @IsString()
  @IsNotEmpty()
  hop: string;

  @IsString()
  @IsNotEmpty()
  yeast: string;

  @IsString()
  @IsNotEmpty()
  malts: string;

  @IsInt()
  @Min(0)
  ibu: number;

  @IsNumber()
  @Min(0)
  alcohol: number;

  @IsNumber()
  @Min(0)
  blg: number;
}
