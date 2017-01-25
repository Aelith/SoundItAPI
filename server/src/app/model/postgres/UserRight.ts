import {Entity, Column, JoinTable, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");
import {User} from "./User";


@Entity("UserRight")
export class UserRight extends PostgresModel {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: 45})
	label: string;

	//bi-directional many-to-many association to User
	@ManyToMany(type => User, user=> user.userRights)
	@JoinTable({name: "UserUserRight"})
	users: User[];

	@CreateDateColumn({default:"NOW()"})
	createTime: Date;

	@UpdateDateColumn({nullable:true})
	updateTime: Date;

	@Column({default:"false"})
	deleted: boolean;

	constructor() {
		super();
	}

}