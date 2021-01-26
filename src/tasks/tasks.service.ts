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

  private async finder(id: number) {
    const task = await this.taskRepository.findOne(id);
    if (!task) throw new NotFoundException('Task doent exists');
    return task;
  }

  async getMany(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getOne(id: number) {
    const task = await this.taskRepository.findOne(id);
    if (!task) throw new NotFoundException('Task doent exists');
    return task;
  }

  async createOne(dto: CreateTaskDto) {
    const task = await this.taskRepository.create(dto);
    return await this.taskRepository.save(task);
  }

  async updateOne(id: number, dto: EditTaskDto) {
    const task = await this.getOne(id);
    const editedTask = await Object.assign(task, dto);

    return await this.taskRepository.save(editedTask);
  }

  async deleteOne(id: number) {
    return await this.taskRepository.delete(id);
  }
}
