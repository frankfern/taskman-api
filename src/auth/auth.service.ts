import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { User } from 'src/users/entities';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user && (await compare(pass, user.password))) {
      return user;
    }
  }
}
