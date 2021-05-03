import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async getMany(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User doent exists');
    return user;
  }

  async createOne(dto: CreateUserDto) {
    const userExist = await this.userRepository.findOne({ email: dto.email });
    if (userExist)
      throw new BadRequestException('User already registered with this email');

    const newUser = await this.userRepository.create(dto);
    const user = await this.userRepository.save(newUser);
    delete user.password;

    return user;
  }

  async updateOne(id: number, dto: EditUserDto) {
    const user = await this.getOne(id);
    const editeduser = await Object.assign(user, dto);

    return await this.userRepository.save(editeduser);
  }

  async deleteOne(id: number) {
    return await this.userRepository.delete(id);
  }
  async findByEmail(email: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where({ email })
      .addSelect('user.password')
      .getOne();
  }
}
