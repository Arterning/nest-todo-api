import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Contact {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number; // 自增 id

  @ApiProperty()
  @Column({ length: 500 })
  phone: string; // 电话

  @ApiProperty()
  @Column('text')
  address?: string; // 地址

  @CreateDateColumn({
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updatedAt: Date;
}
