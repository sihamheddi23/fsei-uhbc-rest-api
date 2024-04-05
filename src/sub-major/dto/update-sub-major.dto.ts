import { PartialType } from '@nestjs/mapped-types';
import { CreateSubMajorDto } from './create-sub-major.dto';

export class UpdateSubMajorDto extends PartialType(CreateSubMajorDto) {}
