import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateTaskDto, EditTaskDto } from './dto';
import { TaskService } from './tasks.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async list() {
    const data = await this.taskService.getMany();
    return {
      message: 'Peticion Correcta',
      data,
    };
  }

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    const data = await this.taskService.createOne(dto);
    return {
      message: 'Peticion Correcta',
      data,
    };
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.getOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditTaskDto,
  ) {
    return await this.taskService.updateOne(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.deleteOne(id);
  }
}
