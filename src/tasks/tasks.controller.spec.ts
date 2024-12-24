import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { TaskBody } from '../interface/task.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      isCompleted: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockTaskService = {
    findAll: jest.fn().mockResolvedValue(mockTasks),
    findOne: jest.fn().mockResolvedValue(mockTasks[0]),
    create: jest.fn().mockResolvedValue(mockTasks[0]),
    update: jest
      .fn()
      .mockImplementation((id, task) =>
        Promise.resolve({ ...mockTasks[0], ...task }),
      ),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: mockTaskService }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all tasks', async () => {
    expect(await controller.findAll()).toEqual(mockTasks);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single task', async () => {
    expect(await controller.findOne('1')).toEqual(mockTasks[0]);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should create a task', async () => {
    const taskBody: TaskBody = {
      title: 'New Task',
      description: 'Task Description',
      isCompleted: false,
    };
    expect(await controller.create(taskBody)).toEqual(mockTasks[0]);
    expect(service.create).toHaveBeenCalledWith(taskBody);
  });

  it('should update a task', async () => {
    const taskBody: TaskBody = {
      title: 'Updated Task',
      description: 'Updated Description',
      isCompleted: true,
    };
    expect(await controller.update('1', taskBody)).toEqual({
      ...mockTasks[0],
      title: 'Updated Task',
      description: 'Updated Description',
      isCompleted: true,
    });
    expect(service.update).toHaveBeenCalledWith('1', taskBody);
  });

  it('should delete a task', async () => {
    expect(await controller.delete('1')).toBeUndefined();
    expect(service.delete).toHaveBeenCalledWith('1');
  });
});
