import { Table, Column, Model,HasOne, ForeignKey, Unique, HasMany } from 'sequelize-typescript';
import { Ad } from 'src/ads/entities/ad.entity';
import { SubMajor } from 'src/sub-major/entities/sub-major.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';

@Table
export class Departement extends Model<Departement> {
    @Column({ primaryKey: true, autoIncrement: true })
    _id: number;

    @Unique
    @Column({ allowNull: false })
    name: string;

    @ForeignKey(() => Teacher)
    @Column
    head_departement_id: number;

    @HasMany(() => Ad, { foreignKey: 'departement_id' })
    ads: Ad[];

    @HasMany(() => SubMajor, { foreignKey: 'departement_id' })
    submajors: SubMajor[];
} 

 