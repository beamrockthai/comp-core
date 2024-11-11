import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class ProductsCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  subTotal: number;

  @IsNotEmpty()
  @IsBoolean()
  isVat: boolean;

  @IsNotEmpty()
  @IsString()
  categoryId: string;
}

export class ProductsUpdateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  subTotal: number;

  @IsNotEmpty()
  @IsBoolean()
  isVat: boolean;

  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
