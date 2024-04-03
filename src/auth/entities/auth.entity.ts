import { Table, Column, Model, Unique } from 'sequelize-typescript';
import { Role } from 'src/utils/types';

@Table
export class User extends Model<User> {
    @Column({ primaryKey: true, autoIncrement: true })
    _id: number;

    @Unique
    @Column
    username: string;
    
    @Unique
    @Column
    email: string;

    @Column
    password: string;

    @Column
    role: Role;
}
