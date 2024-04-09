import { Table, Column, Model, ForeignKey, HasMany} from 'sequelize-typescript';
import { Course } from 'src/course/entities/course.entity';
import { SubMajor } from 'src/sub-major/entities/sub-major.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';

@Table
export class Subject extends Model<Subject> {
    @Column({ primaryKey: true, autoIncrement: true })
    _id: number;

    @Column({ allowNull: false })
    name: string;
    
    @ForeignKey(() => SubMajor)
    @Column
    sub_major_id: number;

    @ForeignKey(() => Teacher)
    @Column
    teacher_id: number

    @HasMany(() => Course, 'subject_id')
    courses: Course[]
}

