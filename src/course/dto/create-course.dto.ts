import { IsAlpha, IsNotEmpty, IsNumber, IsUrl, Length } from "class-validator";

export class CreateCourseDto {
    @IsNotEmpty()
    @IsAlpha()
    name: string;

    @IsNotEmpty()
    @Length(10, 255)
    description: string;

    @IsNotEmpty()
    subject_id: number;
}
