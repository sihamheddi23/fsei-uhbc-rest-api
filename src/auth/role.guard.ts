import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/utils/decorators';
import { Role } from 'src/utils/types';
import { AuthService } from './auth.service';
import { User } from './entities/auth.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
      const { sid } = context.switchToHttp().getRequest();
      const userInfo:User = await this.authService.findUserBySessionId(sid);
      const hasRole: boolean = requiredRoles.some((role) => userInfo.role === role);
      return hasRole;
  }
}