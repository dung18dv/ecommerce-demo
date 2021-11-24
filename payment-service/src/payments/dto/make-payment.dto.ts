import { IsNumber, IsNotEmpty } from 'class-validator';

export class MakePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  order: number;
}
