import { ArrayContains, ArrayNotEmpty, IsAlpha, IsArray, IsNotEmpty, IsNumber, arrayContains } from "class-validator";
import { Column } from "sequelize-typescript";
import { IsArrayContains } from "src/utils/custom-validators";
import { SubMajorLevels } from "src/utils/types";

export class CreateSubMajorDto {
    @IsAlpha()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @ArrayNotEmpty({ message: 'level is required' })
    @IsArrayContains(Object.keys(SubMajorLevels))
    levels: SubMajorLevels[];

    @IsNumber()
    departement_id: number
}
