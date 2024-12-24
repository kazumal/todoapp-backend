import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [TypeOrmModule.forFeature([Task])],
})
export class TasksModule {}
