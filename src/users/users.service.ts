import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, EditUserDto } from './dtos';
import { User } from './entities/users.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private async finder(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('user doent exists');
    return user;
  }

  async getMany(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('user doent exists');
    return user;
  }

  async createOne(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return await this.userRepository.save(user);
  }

  async updateOne(id: number, dto: EditUserDto) {
    const user = await this.getOne(id);
    const editeduser = await Object.assign(user, dto);

    return await this.userRepository.save(editeduser);
  }

  async deleteOne(id: number) {
    return await this.userRepository.delete(id);
  }
}
