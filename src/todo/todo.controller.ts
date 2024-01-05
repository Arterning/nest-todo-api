import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SkipJwtAuth } from 'src/auth/constants';

@ApiTags('待办事项')
@ApiBearerAuth()
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(
    @Request() request,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    return this.todoService.create(request.user.id, createTodoDto);
  }

  @SkipJwtAuth()
  @Post('anonymousCreate')
  async createAnonymous(@Body() body) {
    return this.todoService.createAnonymous(body);
  }

  @Get()
  @SkipJwtAuth()
  async findAll(@Request() request): Promise<Todo[]> {
    if (request.user == null) {
      return this.todoService.findAll();
    }
    const { id, is_admin } = request.user;

    if (is_admin === 1) {
      return this.todoService.findAll();
    } else {
      return this.todoService.findAllByUserId(id);
    }
  }

  /**
   * https://stackoverflow.com/questions/59118081/nestjs-validation-failed-numeric-string-is-expected-inside-controllers-nested
   *
   * As answers given are not really explaining the "why" of this behaviour, here's a quick explanation:

It's just a matter of ordering and what route is met First: "removeAll" is mistaken with an ":id", like 123, 204...etc.

As your router tries the first route that meet route requirements (pattern in this case), your request is forwarded to /id route. It happens in every http framework with a router.

Validation occurs later on. So in short, the only thing that matters in route selection, is pattern, not validation set in it.

This ordering is really important, as you'll face same exact issue in all major http framework with a router.
   * @param request
   * @returns
   */
  @Get('/removeAll')
  async removeAll(@Request() request) {
    const { id: userId } = request.user;
    console.log(`removeAll userId: ${userId}`);
    await this.todoService.removeAll(userId);
    return {
      userId,
    };
  }

  @Get(':id')
  @SkipJwtAuth()
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  @SkipJwtAuth()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    console.log(updateTodoDto, '@@@');
    await this.todoService.update(id, updateTodoDto);
    return updateTodoDto;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.todoService.remove(id);
    return { id };
  }
}
