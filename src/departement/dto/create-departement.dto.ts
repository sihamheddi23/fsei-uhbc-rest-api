import { IsAlpha, IsEnum, IsNotEmpty, IsNumber, IsUrl} from "class-validator";
import { DepartementName } from "src/utils/types";

export class CreateDepartementDto {
    @IsEnum(DepartementName)
    @IsNotEmpty()
    name: DepartementName;

    @IsNumber()
    @IsNotEmpty()
    head_departement_id: number;
    
    @IsUrl()
    more_info_url?: string;
}
