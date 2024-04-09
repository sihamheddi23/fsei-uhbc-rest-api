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
    
    @Column({ allowNull: true })
    document_url: string;
    
    @Column({ allowNull: false })
    type: AdsType;

    @ForeignKey(() => Departement)
    @Column({ allowNull: true })
    departement_id: number
}

