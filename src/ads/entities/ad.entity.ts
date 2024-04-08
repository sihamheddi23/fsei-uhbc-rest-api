import { Table, Column, Model, ForeignKey} from 'sequelize-typescript';
import { Departement } from 'src/departement/entities/departement.entity';
import { AdsType } from 'src/utils/types';

@Table
export class Ad extends Model<Ad> {
    @Column({ primaryKey: true, autoIncrement: true })
    _id: number;

    @Column({ allowNull: false })
    title: string;

    @Column({ allowNull: false })
    description: string;
    
    @Column({ allowNull: false })
    document_url: string;
    
    @Column({ allowNull: false })
    type: AdsType;

    @ForeignKey(() => Departement)
    @Column
    departement_id: number
}

