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
  async getMany() {
    const data = await this.taskService.getMany();
    return {
      message: 'Peticion Correcta',
      data,
    };
  }

  @Post()
  async crateOne(@Body() dto: CreateTaskDto) {
    const data = await this.taskService.createOne(dto);
    return {
      message: 'Peticion Correcta',
      data,
    };
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.getOne(id);
  }

  @Put(':id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: EditTaskDto) {
    return this.taskService.updateOne(id, dto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteOne(id);
  }
}
