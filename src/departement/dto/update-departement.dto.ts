import { IsNumber, IsUrl } from "class-validator";

export class UpdateDepartementDto  {
    @IsNumber()
    head_departement_id: number;
    @IsUrl()
    more_info_url?: string;
}
