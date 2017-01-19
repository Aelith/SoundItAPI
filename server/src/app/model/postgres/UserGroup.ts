import {Table, Column, JoinTable, PrimaryGeneratedColumn, ManyToMany, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");
import {RoomRight} from "./RoomRight";
import {KnownUser} from "./KnownUser";
import {Room} from "./Room";


@Table()
export class UserGroup implements PostgresModel {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: 45})
	label: string;

	//bi-directional many-to-one association to Knownuser
	@OneToMany(type => KnownUser, knownUser => knownUser.userGroup)
	knownUsers: KnownUser[];

	//bi-directional many-to-one association to Room
	@OneToMany(type => Room, room => room.userGroup)
	rooms: Room[];
	
	//bi-directional many-to-many association to Roomright
	@ManyToMany(type => RoomRight, roomRight=> roomRight.userGroups, {nullable: true})
	@JoinTable({name: "userGroupRoomRight"})
	roomRights: RoomRight[];

	@CreateDateColumn({default:"NOW()"})
	createTime: Date;

	@UpdateDateColumn({nullable:true})
	updateTime: Date;

	@Column({default:false})
	deleted: boolean;
	
	constructor() {
	}

}