import { Table, Column, Model, ForeignKey} from 'sequelize-typescript';
import { Departement } from 'src/departement/entities/departement.entity';
import { SubMajorLevels, TeacherGrade } from 'src/utils/types';

@Table
export class SubMajor extends Model<SubMajor> {
    @Column({ primaryKey: true, autoIncrement: true })
    _id: number;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    level: SubMajorLevels;

    @ForeignKey(() => Departement) 
    @Column({ allowNull: false })
    departement_id: number

}

