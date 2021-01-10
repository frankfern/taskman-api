import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type } from 'os';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TaskModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
