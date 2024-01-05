import { TodoStatus } from '../entities/todo.entity';
import { IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title: string; // 标题

  @IsString()
  description?: string; // 具体内容

  @IsString()
  status?: TodoStatus; // 状态

  @IsString()
  media?: string;
}
