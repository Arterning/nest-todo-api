import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { TodoType } from './todo.type.entity';

export enum TodoStatus {
  TODO = 0, // 待完成
  DONE = 1, // 未完成
}

@Entity()
export class Todo {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number; // 自增 id

  @ApiProperty()
  @Column({ length: 500 })
  title: string; // 标题

  @ApiProperty()
  @Column('text')
  description?: string; // 具体内容

  @ApiProperty()
  @Column('int', { default: TodoStatus.TODO })
  status: TodoStatus; // 状态

  @ApiProperty({ required: false })
  @Column('text')
  media?: string;

  @ManyToOne(() => User, (user) => user.todos)
  author: User;

  @ManyToOne(() => TodoType, (todoType) => todoType.todos)
  todoType: TodoType;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updatedAt: Date;
}
