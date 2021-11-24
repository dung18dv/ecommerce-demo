import { Injectable } from '@nestjs/common';
import { MakePaymentDto } from './dto/make-payment.dto';

@Injectable()
export class PaymentsService {
  makePayment(makePaymentDto: MakePaymentDto) {
    const success = this.getRandomResponse();
    return { success };
  }

  private getRandomResponse(): boolean {
    return Math.random() < 0.5;
  }
}
