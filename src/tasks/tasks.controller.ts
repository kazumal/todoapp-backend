import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { TaskBody } from '../interface/task.dto';
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() task: TaskBody): Promise<Task> {
    return this.tasksService.create(task);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() task: TaskBody): Promise<Task> {
    return this.tasksService.update(id, task);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.tasksService.delete(id);
  }
}
