import {Table, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Country} from "./Country";
import PostgresModel = require("./interfaces/PostgresModel");


@Table()
export class Address implements PostgresModel {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	address1: string;

	@Column()
	address2: string;

	@Column({length: 80})
	city: string;

	@Column({length: 45})
	postalCode: string;

	@Column({length: 80, nullable:true})
	state: string;

	//bi-directional many-to-one association to Country
	@ManyToOne(type => Country, country => country.addresses, {nullable: false})
	country: Country;

	//bi-directional many-to-one association to User
	@ManyToOne(type => User, user => user.addresses, {nullable: false})
	user: User;

	@CreateDateColumn({default:"NOW()"})
	createTime: Date;

	@UpdateDateColumn({nullable:true})
	updateTime: Date;

	@Column({default:false})
	deleted: boolean;
	
	constructor() {
		
	}


}