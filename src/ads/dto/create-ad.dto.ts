import { IsAlpha, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUrl } from "class-validator";
import { AdsType } from "src/utils/types";

export class CreateAdDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
    
    @IsOptional()
    @IsUrl()
    document_url: string;
    
    @IsEnum(AdsType)
    @IsNotEmpty()
    type: AdsType;
     
    @IsOptional()
    @IsNumber()
    departement_id: number
}
