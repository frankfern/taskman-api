import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login() {
    return 'Estas autenticado';
  }

  @Get('profile')
  profile() {
    return 'estosson tus datos';
  }
}
