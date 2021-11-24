import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Product)
  @JoinColumn({ name: 'product', referencedColumnName: 'id' })
  product: Product;

  @ApiProperty()
  @Column()
  quantity: number;

  @ManyToOne((type) => Order)
  @JoinColumn({ name: 'order', referencedColumnName: 'id' })
  order: Order;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true
  })
  updatedAt: Date;
}
