import { Table, Column, Model,HasOne, ForeignKey, Unique } from 'sequelize-typescript';
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
} 

 