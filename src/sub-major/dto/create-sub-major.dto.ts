import { ArrayContains, ArrayNotEmpty, IsArray, IsNumber, arrayContains } from "class-validator";
import { Column } from "sequelize-typescript";
import { SubMajorLevels } from "src/utils/types";

export class CreateSubMajorDto {
    @Column({ allowNull: false })
    name: string;

    @IsArray()
    @ArrayNotEmpty({ message: 'level is required' })
    @ArrayContains(Object.keys(SubMajorLevels))
    levels: SubMajorLevels[];

    @IsNumber()
    departement_id: number
}
