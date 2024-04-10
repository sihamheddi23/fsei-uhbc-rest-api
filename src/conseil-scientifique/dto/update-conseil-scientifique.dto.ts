import { PartialType } from '@nestjs/mapped-types';
import { CreateConseilScientifiqueDto } from './create-conseil-scientifique.dto';

export class UpdateConseilScientifiqueDto extends PartialType(CreateConseilScientifiqueDto) {}
