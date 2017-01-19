import {Table, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn,JoinColumn} from "typeorm";
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

	@Column({length: 80})
	state: string;


	//bi-directional many-to-one association to Country
	@ManyToOne(type => Country, country => country.addresses, {nullable: false})
	//@JoinColumn({name: "countryId"})
	country: Country;

	//@Column({ nullable: false })
	//countryId: number;

	//bi-directional many-to-one association to User
	@ManyToOne(type => User, user => user.addresses, {nullable: false})
	user: User;


	@CreateDateColumn()
	createTime: Date; //TimeStamp;

	@UpdateDateColumn({nullable: true})
	updateTime: Date; //TimeStamp;

	@Column()
	deleted: boolean;


	constructor() {

	}


}