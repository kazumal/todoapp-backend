import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { TaskDto } from 'src/interface/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } });
  }

  async create(task: TaskDto): Promise<Task> {
    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }

  async update(id: string, task: Task): Promise<Task> {
    await this.taskRepository.update(id, task);
    return this.taskRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
