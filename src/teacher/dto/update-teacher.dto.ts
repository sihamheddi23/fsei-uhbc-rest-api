import { IsAlpha, IsEnum, IsNotEmpty, Length } from "class-validator";
import { TeacherGrade } from "src/utils/types";

export class UpdateTeacherDto{ 
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
}
