import { Table, Column, Model, ForeignKey} from 'sequelize-typescript';
import { SubMajor } from 'src/sub-major/entities/sub-major.entity';

@Table
export class Schedule extends Model<Schedule> {
    @Column({ primaryKey: true, autoIncrement: true })
    _id: number;

    @Column({ allowNull: false })
    title: string;
    
    @ForeignKey(() => SubMajor)
    @Column({ allowNull: false })
    sub_major_id: number;

    @Column({ allowNull: true })
    pdf_url: string
}

