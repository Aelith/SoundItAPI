import {Table, Column, JoinTable, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");
import {User} from "./User";


@Table()
export class UserRight implements PostgresModel {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: 45})
	label: string;

	//bi-directional many-to-many association to User
	@ManyToMany(type => User, user=> user.userRights, {nullable: true})
	@JoinTable({name: "userUserRight"})
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