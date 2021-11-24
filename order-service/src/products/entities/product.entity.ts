import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  price: number;

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
