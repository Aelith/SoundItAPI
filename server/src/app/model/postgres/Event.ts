import {Table, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");
import {RoomTemplate} from "./RoomTemplate";
import {Tag} from "./Tag";


@Table()
export class Event implements PostgresModel {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: 80})
	name: string;

	@Column("text")
	description: string;

	@Column()
	eventDate: Date;

	//bi-directional many-to-one association to Roomtemplate
	@ManyToOne(type => RoomTemplate, roomTemplate => roomTemplate.events, {nullable: false})
	roomTemplate: RoomTemplate;

	//bi-directional many-to-many association to Tag
	@ManyToMany(type => Tag, tag=> tag.events)
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