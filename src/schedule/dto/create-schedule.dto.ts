import { IsAlpha, IsNotEmpty, IsNumber, IsUrl } from "class-validator";

export class CreateScheduleDto {
    @IsNotEmpty()
    title: string;
     
    @IsNotEmpty()
    sub_major_id: number;
}
