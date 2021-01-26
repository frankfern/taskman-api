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
import { CreateUserDto, EditUserDto } from './dtos';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async list() {
    const data = await this.userService.getMany();
    return {
      message: 'Peticion Correcta',
      data,
    };
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const data = await this.userService.createOne(dto);
    return {
      message: 'Peticion Correcta',
      data,
    };
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditUserDto,
  ) {
    return await this.userService.updateOne(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteOne(id);
  }
}
