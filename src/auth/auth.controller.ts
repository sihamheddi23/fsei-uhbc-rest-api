import { Controller, Post, Body, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guards';
import { LoginInputDto } from './dto/loginInput.dto';
import { Role } from 'src/utils/types';
import { Roles } from 'src/utils/decorators';
import { RolesGuard } from './role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  login(@Request() req, @Body(ValidationPipe) loginInputDto: LoginInputDto) {
    return this.authService.login(loginInputDto,req.headers['user-agent']);
  }
  
  @Roles(Role.ADMIN, Role.HEAD_DEPARTEMENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/add-user")
  async addUser(@Body(ValidationPipe) CreateUserDto: CreateUserDto) {
    const user = await this.authService.createUser(CreateUserDto);
    return {
      email: user.email,
      username: user.username,
      id: user._id
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post("/logout")
  async logout(@Request() req) {
    await this.authService.unvalidateSession(req.user.sid);
    return { message: "logged out" };
  }

}
