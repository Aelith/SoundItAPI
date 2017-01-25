import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Address} from "./Address";
import PostgresModel = require("./interfaces/PostgresModel");


@Entity("Country")
export class Country extends PostgresModel {

	@PrimaryGeneratedColumn()
    id: number;
	
	@Column({length: 2})
	iso: string;
	
	@Column({length: 3, nullable: true})
	iso3: string;
	
	@Column({length: 80})
	name: string;
	
	@Column({nullable: true})
	numCode: number;
	
	@Column({nullable: true})
	phoneCode: number;
	
	@Column({length: 80})
	prettyPrintName: string;

	//bi-directional many-to-one association to Address
	@OneToMany(type => Address, address => address.country)
	addresses: Address[];

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