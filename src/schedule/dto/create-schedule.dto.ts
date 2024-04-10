import { IsAlpha, IsNotEmpty, IsNumber, IsUrl } from "class-validator";

export class CreateScheduleDto {
    @IsNotEmpty()
    title: string;

    @IsUrl()
    pdf_url: string;
     
    @IsNotEmpty()
    @IsNumber()
    sub_major_id: number;
}
