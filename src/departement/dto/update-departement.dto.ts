import { CreateDepartementDto } from './create-departement.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateDepartementDto extends PartialType(CreateDepartementDto) {}
