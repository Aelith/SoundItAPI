import {Table, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import PostgresModel = require("./interfaces/PostgresModel");


@Table()
export class LoginType implements PostgresModel {
	@PrimaryGeneratedColumn()
    id: number;

	@Column({length: 45})
	label: string;

	//bi-directional many-to-one association to User
	@OneToMany(type => User, user => user.loginType)
	users: User[];

	@CreateDateColumn({default:"NOW()"})
	createTime: Date;

	@UpdateDateColumn({nullable:true})
	updateTime: Date;

	@Column({default:false})
	deleted: boolean;
	
	constructor() {
	}

}