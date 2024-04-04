import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { User } from './auth.entity';

@Table
export class SessionToken extends Model<SessionToken> {
    @Column({ primaryKey: true, autoIncrement: true })
    _id: number;

    @ForeignKey(() => User)
    @Column
    userID: number;
    
    @Column
    isValid: boolean;

    @Column
    userAgent: string;

    @Column
    createdAt: Date;
}
