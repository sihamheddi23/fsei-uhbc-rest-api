import { Table, Column, Model, ForeignKey, HasOne} from 'sequelize-typescript';
import { SubMajor } from 'src/sub-major/entities/sub-major.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';

@Table
export class Subject extends Model<Subject> {
    @Column({ primaryKey: true, autoIncrement: true })
    _id: number;

    @Column({ allowNull: false })
    name: string;
    
    @ForeignKey(()=>SubMajor)
    sub_major_id: number;

    @ForeignKey(() => Teacher)
    teacher_id: number
}

