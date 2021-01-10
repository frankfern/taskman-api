import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTaskDto, EditTaskDto } from './dto';
import { Task } from './entities/tasks.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getMany(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getOne(id: number) {
    const task = await this.taskRepository.findOne(id);
    if (!task) throw new NotFoundException('Task doent exists');
    return task;
  }

  async createOne(dto: CreateTaskDto) {
    const task = this.taskRepository.create(dto);

    console.log(await this.taskRepository.save(task));

    return await this.taskRepository.save(task);
  }

  async updateOne(id: number, dto: EditTaskDto) {
    const task = await this.taskRepository.findOne(id);

    if (!task) throw new NotFoundException('Task doent exists');

    const editedTask = Object.assign(task, dto);

    return await this.taskRepository.save(editedTask);
  }

  async deleteOne(id: number) {
    return await this.taskRepository.delete(id);
  }
}
