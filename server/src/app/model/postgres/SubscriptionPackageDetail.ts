import {Table, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");
import {Tax} from "./Tax";
import {SubscriptionPackage} from "./SubscriptionPackage";


@Table()
export class SubscriptionPackageDetail implements PostgresModel {

	@PrimaryGeneratedColumn()
	id: number;

	@Column("text")
	description: string;

	@Column({length: 45})
	name: string;

	@Column()
	preTaxPrice: number;

	//bi-directional many-to-one association to Subscriptionpackage
	@OneToMany(type => SubscriptionPackage, subscriptionPackage => subscriptionPackage.subscriptionPackageDetail)
	subscriptionPackages: SubscriptionPackage[];
	
	//bi-directional many-to-one association to Tax
	@ManyToOne(type => Tax, tax => tax.subscriptionPackageDetails, {nullable:false})
	tax: Tax;

	@CreateDateColumn({default:"NOW()"})
	createTime: Date;

	@UpdateDateColumn({nullable:true})
	updateTime: Date;

	@Column({default:false})
	deleted: boolean;
	
	constructor() {
	}

}