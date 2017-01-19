import {Table, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");
import {UserGroup} from "./UserGroup";


@Table()
export class RoomRight implements PostgresModel {

	@PrimaryGeneratedColumn()
	id: number;
	
	@Column({length: 45})
	label: string;

	//bi-directional many-to-many association to Usergroup
	@ManyToMany(type => UserGroup, userGroup=> userGroup.roomRights)
	userGroups: UserGroup[];

	@CreateDateColumn({default:"NOW()"})
	createTime: Date;

	@UpdateDateColumn({nullable:true})
	updateTime: Date;

	@Column({default:false})
	deleted: boolean;
	
	constructor() {
	}

}