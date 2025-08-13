import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('password') password: string
  ) {
    return this.authService.register(email, name, password);
  }

  @Post('login')
  login(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    return this.authService.login(email, password);
  }
}
