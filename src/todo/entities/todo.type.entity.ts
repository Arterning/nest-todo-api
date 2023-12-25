import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Todo } from './todo.entity';

@Entity()
export class TodoType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  type: string;

  @Column('text')
  description: string;

  @OneToMany(() => Todo, (todo) => todo.todoType)
  todos: Todo[];
}
