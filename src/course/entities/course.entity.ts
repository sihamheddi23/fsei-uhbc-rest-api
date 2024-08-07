import { Table, Column, Model, ForeignKey, HasOne} from 'sequelize-typescript';
import { Subject } from 'src/subject/entities/subject.entity';

@Table
export class Course extends Model<Course> {
    @Column({ primaryKey: true, autoIncrement: true })
    _id: number;

    @Column
    name: string;

    @Column
    description: string;

    @ForeignKey(() => Subject)
    @Column   
    subject_id: number;
    
    @Column
    pdf_url: string;
}

