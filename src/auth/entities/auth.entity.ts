import { Table, Column, Model, Unique, HasMany, HasOne } from 'sequelize-typescript';
import { Role } from 'src/utils/types';
import { SessionToken } from './session.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';

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

    @HasMany(() => SessionToken, 'userID')
    sessions: SessionToken[];

    @HasOne(()=> Teacher, 'user_id')
    teacher: Teacher
}
