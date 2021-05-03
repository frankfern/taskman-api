import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities';
import { UserService } from 'src/users/users.service';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findOne({ email });

    if (user && (await compare(pass, user.password))) {
      return user;
    }
    return null;
  }
}
