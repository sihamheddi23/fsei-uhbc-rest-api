import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ExtractJwt } from 'passport-jwt';
import * as jwt from 'jsonwebtoken'
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      let response;
      const { id } = await this.jwtService.decode(token);
      jwt.verify(token, process.env.JWT_SECRET,  (error) => {
        if (error) {
          const err = { ...error }
          if(err.name == "TokenExpiredError"){
            this.authService.unvalidateSession(id);
            throw new UnauthorizedException("unauthorized acces you need to login");
          }
          else {
            throw new UnauthorizedException("invalid token");
          }
        } 
        response = true 
      })
      const user = await this.authService.findUserBySessionId(id);
      if(!user){
        throw new UnauthorizedException("unauthorized acces you need to login");
      }
      request['sid'] = id;
      return response
    } catch (error) {
      const err = {...error}
      throw new UnauthorizedException(err.message)
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    return ExtractJwt.fromAuthHeaderAsBearerToken()(request);
  }
}
