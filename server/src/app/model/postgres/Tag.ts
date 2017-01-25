import {Entity, Column, JoinTable, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");
import {Event} from "./Event";
import {RoomTemplate} from "./RoomTemplate";
import {Room} from "./Room";


@Entity("Tag")
export class Tag extends PostgresModel {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: 45})
	label: string;

	//bi-directional many-to-many association to Event
	@ManyToMany(type => Event, event=> event.tags)
	@JoinTable({name: "EventTag"})
	events: Event[];
	
	//bi-directional many-to-many association to Room
	@ManyToMany(type => Room, room=> room.tags)
	@JoinTable({name: "RoomTag"})
	rooms: Room[];
	
	//bi-directional many-to-many association to Roomtemplate
	@ManyToMany(type => RoomTemplate, roomTemplate=> roomTemplate.tags)
	@JoinTable({name: "RoomTemplateTag"})
	roomTemplates: RoomTemplate[];

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