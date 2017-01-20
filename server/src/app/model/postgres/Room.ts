import {Table, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {RoomTemplate} from "./RoomTemplate";
import {UserGroup} from "./UserGroup";
import {RoomPlaylist} from "./RoomPlaylist";
import {Tag} from "./Tag";
import {RoomUser} from "./RoomUser";
import PostgresModel = require("./interfaces/PostgresModel");


@Table()
export class Room implements PostgresModel {
	@PrimaryGeneratedColumn()
    id: number;

	@Column()
	active: boolean;

	@Column("text")
	description: string;

	@Column({length: 45})
	label: string;

	@Column({length: 120, nullable:true})
	password: string;

	@Column()
	state: boolean;

	@Column()
	usingValidation: boolean;

	//bi-directional many-to-one association to Roomtemplate
	@ManyToOne(type => RoomTemplate, roomTemplate => roomTemplate.rooms, {nullable: false})
	roomTemplate: RoomTemplate;

	//bi-directional many-to-one association to Usergroup
	@ManyToOne(type => UserGroup, userGroup => userGroup.rooms, {nullable: false})
	userGroup: UserGroup;

	//bi-directional many-to-one association to Roomplaylist
	@OneToMany(type => RoomPlaylist, roomPlaylist => roomPlaylist.room)
	roomPlaylists: RoomPlaylist[];
	
	//bi-directional many-to-many association to Tag
	@ManyToMany(type => Tag, tag=> tag.rooms)
	tags: Tag[];
	
	//bi-directional many-to-one association to Roomuser
	@OneToMany(type => RoomUser, roomUser => roomUser.room)
	roomUsers: RoomUser[];

	@CreateDateColumn({default:"NOW()"})
	createTime: Date;

	@UpdateDateColumn({nullable:true})
	updateTime: Date;

	@Column({default:false})
	deleted: boolean;


	constructor() {
	}

}