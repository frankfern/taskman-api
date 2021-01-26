import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type } from 'os';

import { TaskModule } from './tasks/tasks.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TaskModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
