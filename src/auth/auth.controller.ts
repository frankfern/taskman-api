import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: any) {
    return req.user;
  }

  @Get('profile')
  profile() {
    return 'estos son tus datos';
  }
}
