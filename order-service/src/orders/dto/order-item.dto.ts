import { IsNumber, IsNotEmpty, IsInt } from 'class-validator';

export class OrderItemDto {
  @IsNumber()
  @IsNotEmpty()
  product: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
