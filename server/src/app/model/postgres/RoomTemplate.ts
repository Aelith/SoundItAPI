import {Table, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");
import {Event} from "./Event";
import {Tag} from "./Tag";
import {KnownUser} from "./KnownUser";
import {Room} from "./Room";
import {User} from "./User";


@Table()
export class RoomTemplate implements PostgresModel {

	@PrimaryGeneratedColumn()
	id: number;

	@Column("text")
	description: string;

	@Column({length: 45})
	name: string;

	//bi-directional many-to-one association to Event
	@OneToMany(type => Event, event => event.roomTemplate)
	events: Event[];

	//bi-directional many-to-one association to Knownuser
	@OneToMany(type => KnownUser, knownUser => knownUser.roomTemplate)
	knownUsers: KnownUser[];
	
	//bi-directional many-to-one association to Room
	@OneToMany(type => Room, room => room.roomTemplate)
	rooms: Room[];
	
	//bi-directional many-to-one association to User
	@ManyToOne(type => User, user => user.roomTemplates, {nullable:false})
	user: User;

	//bi-directional many-to-many association to Tag
	@ManyToMany(type => Tag, tag=> tag.roomTemplates)
	tags: Tag[];

	@CreateDateColumn({default:"NOW()"})
	createTime: Date;

	@UpdateDateColumn({nullable:true})
	updateTime: Date;

	@Column({default:false})
	deleted: boolean;
	
	constructor() {
	}

}