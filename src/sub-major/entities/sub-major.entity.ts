import { Table, Column, Model, ForeignKey, HasMany} from 'sequelize-typescript';
import { Course } from 'src/course/entities/course.entity';
import { Departement } from 'src/departement/entities/departement.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { SubMajorLevels } from 'src/utils/types';

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
    
    @HasMany(() => Subject, 'sub_major_id')
    subjects: Subject[]

    @HasMany(() => Schedule, 'sub_major_id')
    schedules: Schedule[]
}

