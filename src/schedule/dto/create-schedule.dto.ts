import { IsNotEmpty, IsNumberString } from "class-validator";

export class CreateScheduleDto {
    @IsNotEmpty()
    title: string;
     
    @IsNotEmpty()
    @IsNumberString()
    sub_major_id: string;
}
