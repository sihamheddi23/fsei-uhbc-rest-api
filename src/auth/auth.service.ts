import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private users = [
    {
      _id: 1,
      username: 'John',
      pass: '123456',
    },
    {
      _id: 2,
      username: 'Jane',
      pass: '123456',
    },
    {
      _id: 3,
      username: 'Jack',
      pass: '123456',
    },
    {
      _id: 4,
      username: 'Jill',
      pass: '123456',
    },
    {
      _id: 5,
      username: 'Jim',
      pass: '123456',
    },
  ];

  constructor(private jwtService: JwtService) {}
  async validate(payload) {
    const { id } = payload;

    const user = await this.findOne(id);
    console.log(user);

    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }

    return user;
  }
  findOne(id: number) {
    return this.users.find((user) => user._id === id);
  }

  async login(loginDto: {
    username: string;
    password: string;
  }): Promise<{ token: string }> {
    const { username, password } = loginDto;

    const user = this.users.find(
      (user) => user.username === username && user.pass === password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}
