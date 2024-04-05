import { IsAlpha, IsEnum, IsNotEmpty, IsNumber, Length } from "class-validator";
import { TeacherGrade } from "src/utils/types";

export class CreateTeacherDto {
    
    @IsNotEmpty()
    @IsAlpha()
    @Length(3, 20)
    first_name: string;

    @IsNotEmpty()
    @IsAlpha()
    @Length(3, 20)
    last_name: string;
   
    @IsEnum(TeacherGrade)
    @IsNotEmpty()
    grade: TeacherGrade; 

    @IsNotEmpty()
    @IsNumber()
    user_id: number
}
