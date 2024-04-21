import { Controller, Post, Body, UseGuards, Request, ValidationPipe, Get, Put, Param, Delete, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guards';
import { LoginInputDto } from './dto/loginInput.dto';
import { Role } from 'src/utils/types';
import { Roles } from 'src/utils/decorators';
import { RolesGuard } from './role.guard';
import { UpdateUserDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Get("/users")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUsers() {
    return await this.authService.getUsers();
  }

  @Patch("/users/:id")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateUser(@Body(ValidationPipe) updateUserDto: UpdateUserDto, @Param("id") id: number) {
    return await this.authService.updateUser(id, updateUserDto);
  }

  @Delete("/users/:id")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUser(@Param("id") id: number) {
    return await this.authService.deleteUser(id);
  }

  @Post("/login")
  login(@Request() req, @Body(ValidationPipe) loginInputDto: LoginInputDto) {
    return this.authService.login(loginInputDto,req.headers['user-agent']);
  }
  
  @Roles(Role.ADMIN)
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
