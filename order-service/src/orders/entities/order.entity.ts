import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  CREATED = 'created',
  CONFIRM = 'confirmed',
  CANCELLED = 'cancelled',
  DELIVERED = 'delivered'
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @OneToMany((type) => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CREATED
  })
  status: OrderStatus;

  @ApiProperty()
  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

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
