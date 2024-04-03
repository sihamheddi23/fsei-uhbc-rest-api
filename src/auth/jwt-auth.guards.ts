import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log(payload.id);
      
      //  if(payload.exp < Date.now() / 1000) {
      //    await this.authService.unvalidateSession(payload.id);
      //    throw new UnauthorizedException();
      //  }
      //  else {
      //   const user = await this.authService.findUserBySessionId(payload.id);
      //   if (!user) {
      //     throw new UnauthorizedException();
      //   }
      //   request['sid'] = payload.id;
      // }
    } catch {
     
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    return ExtractJwt.fromAuthHeaderAsBearerToken()(request);
  }
}
