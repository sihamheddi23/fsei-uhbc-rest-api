import { Table, Column, Model, ForeignKey, HasMany} from 'sequelize-typescript';
import { User } from 'src/auth/entities/auth.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { TeacherGrade } from 'src/utils/types';

@Table
export class Teacher extends Model<Teacher> {
    @Column({ primaryKey: true, autoIncrement: true })
    _id: number;

    @Column({ allowNull: false })
    first_name: string;

    @Column({ allowNull: false })
    last_name: string;
   
    @Column({ allowNull: false })
    grade: TeacherGrade; 

    @ForeignKey(() => User)
    @Column 
    user_id: number

    @HasMany(() => Subject)
    subjects: Subject[]

}

