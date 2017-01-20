import {Table, Embedded, Column, PrimaryColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");
import {Room} from "./Room";
import {User} from "./User";


@Table("RoomUser")
export class RoomUser extends PostgresModel {

	@Column()
	firstvisit: Date;

	@Column({default:"NOW()"})
	lastvisit: Date;

	//bi-directional many-to-one association to Room
	@ManyToOne(type => Room, room => room.roomUsers, {nullable:false, primary:true})
	room: Room;
	
	//bi-directional many-to-one association to User
	@ManyToOne(type => User, user => user.roomUsers, {nullable:false, primary:true})
	user: User;

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