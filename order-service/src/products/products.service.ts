import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  async findAll() {
    return this.productRepository.find({});
  }

  async findOne(id: number) {
    const targetOrder = await this.productRepository.findOne(id);
    if (!targetOrder)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return targetOrder;
  }
}
