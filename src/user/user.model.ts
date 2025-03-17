import { Column, Model, Table } from "sequelize-typescript";

@Table
export class User extends Model {
    @Column
    private name: string

    @Column
    private email: string

    @Column
    private password: string
}