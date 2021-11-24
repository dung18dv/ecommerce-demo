import { IsNotEmpty } from 'class-validator';

export class MakePaymentResponseDto {
  @IsNotEmpty()
  success: boolean;
}
