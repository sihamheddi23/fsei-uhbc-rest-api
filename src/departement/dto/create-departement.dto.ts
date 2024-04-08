import { IsAlpha, IsNotEmpty, IsNumber, IsUrl} from "class-validator";

export class CreateDepartementDto {
    @IsAlpha()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    head_departement_id: number;
}
