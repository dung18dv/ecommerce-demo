import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItemDto } from './dto/order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { Order, OrderStatus } from './entities/order.entity';
import * as Promise from 'bluebird';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private productService: ProductsService
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { description, items } = { ...createOrderDto };
    const vItems = await this.getItemsWithProducts(items);
    const totalPrice = this.getTotalPrice(vItems);

    const savedItems = await this.saveOrderItems(vItems);
    const newOrder = this.orderRepository.create({
      description,
      totalPrice,
      items: savedItems
    });
    const savedOrder = await this.orderRepository.save(newOrder);
    return savedOrder;
  }

  async findAll() {
    return await this.orderRepository.find();
  }

  async findOne(id: number) {
    const targetOrder = await this.orderRepository.findOne(id);
    if (!targetOrder)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return targetOrder;
  }

  async cancel(id: number) {
    return await this.orderRepository.save({
      id,
      status: OrderStatus.CANCELLED
    });
  }

  private async getItemsWithProducts(items: OrderItemDto[]) {
    const itemsWithProducts = await Promise.map(items, async (item) => {
      const { product: productId = undefined, quantity = 0 } = { ...item };
      const targetProduct = await this.productService.findOne(productId);
      return { product: targetProduct, quantity };
    });
    return itemsWithProducts;
  }

  private saveOrderItems(items: [{ quantity: number; product: Product }]) {
    return this.orderItemRepository.save(items);
  }

  private getTotalPrice(items: [{ quantity: number; product: Product }]) {
    return items.reduce((accum, currentItem) => {
      const { quantity = 0, product = undefined } = { ...currentItem };
      return accum + product.price * quantity;
    }, 0);
  }
}
