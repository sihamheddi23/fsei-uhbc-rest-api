import { Module } from '@nestjs/common';
import { SubMajorService } from './sub-major.service';
import { SubMajorController } from './sub-major.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubMajor } from './entities/sub-major.entity';
import { JwtModule } from '@nestjs/jwt';
import { DepartementModule } from 'src/departement/departement.module';

@Module({
  imports: [DepartementModule, AuthModule, SequelizeModule.forFeature([SubMajor]), JwtModule],
  controllers: [SubMajorController],
  providers: [SubMajorService],
  exports: [SubMajorService],
})
export class SubMajorModule {}
