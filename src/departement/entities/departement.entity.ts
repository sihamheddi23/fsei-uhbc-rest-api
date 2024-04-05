import { Table, Column, Model,HasOne, ForeignKey, Unique } from 'sequelize-typescript';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { DepartementName } from 'src/utils/types';

@Table
export class Departement extends Model<Departement> {
    @Column({ primaryKey: true, autoIncrement: true })
    _id: number;

    @Unique
    @Column({ allowNull: false })
    name: DepartementName;

    @Column
    more_info_url: string; 

    @ForeignKey(() => Teacher)
    @Column
    head_departement_id: number;
} 

 