import { IsNotEmpty, IsObject } from 'class-validator';

export class ThemeDto {
  @IsNotEmpty()
  @IsObject()
  screen: {
    mainColor: string;
    subColor: string;
    bgColor: string;
    title: {
      mainColor: string;
      subColor: string;
    };
    text: {
      mainColor: string;
      subColor: string;
    };
  };

  @IsNotEmpty()
  @IsObject()
  doc: {
    mainColor: string;
    subColor: string;
    text: string;
    imageUrl: string;
  };
}
