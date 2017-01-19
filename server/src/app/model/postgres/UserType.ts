import {Table, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");
import {User} from "./User";


@Table()
export class UserType implements PostgresModel {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length:45})
	label: string;

	//bi-directional many-to-one association to User
	@OneToMany(type => User, user => user.userType)
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