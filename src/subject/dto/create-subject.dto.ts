import { IsAlpha, IsNotEmpty, IsNumber } from "class-validator";

export class CreateSubjectDto {
    @IsAlpha()
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    @IsNumber()
    sub_major_id: number;

    @IsNotEmpty()
    @IsNumber()
    teacher_id: number;
}
