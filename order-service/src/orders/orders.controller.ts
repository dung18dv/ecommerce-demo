import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    console.log(id);
    return await this.ordersService.findOne(id);
  }

  @Delete(':id')
  async cancel(@Param('id') id: number) {
    return await this.ordersService.cancel(id);
  }
}
