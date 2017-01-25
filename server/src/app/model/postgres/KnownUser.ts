import {Entity, Column, Embedded, PrimaryColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");


import {User} from "./User";
import {RoomTemplate} from "./RoomTemplate";
import {UserGroup} from "./UserGroup";



@Entity("KnownUser")
export class KnownUser extends PostgresModel {

	@Column()
	experience: number;

	//bi-directional many-to-one association to Roomtemplate
	@ManyToOne(type => RoomTemplate, roomTemplate => roomTemplate.knownUsers, {nullable:false, primary:true})
	roomTemplate: RoomTemplate;
	
	//bi-directional many-to-one association to User
	@ManyToOne(type => User, user => user.knownUsers, {nullable:false, primary:true})
	user: User;

	//bi-directional many-to-one association to Usergroup
	@ManyToOne(type => UserGroup, userGroup => userGroup.knownUsers, {nullable:false, primary:true})
	userGroup: UserGroup;

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