import { IsAlpha, IsNotEmpty, IsNumber, IsUrl, Length } from "class-validator";

export class CreateCourseDto {
    @IsNotEmpty()
    @IsAlpha()
    name: string;

    @IsAlpha()
    @IsNotEmpty()
    @Length(10, 255)
    description: string;

    @IsNotEmpty()
    @IsNumber()
    subject_id: number;
    
    @IsUrl()
    pdf_url: string;
}
