import {Table, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");
import {SubscriptionPackage} from "./SubscriptionPackage";


@Table("SubscriptionPackageState")
export class SubscriptionPackageState extends PostgresModel {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: 45})
	label: string;
	
	//bi-directional many-to-one association to Subscriptionpackage
	@OneToMany(type => SubscriptionPackage, subscriptionPackage => subscriptionPackage.subscriptionPackageState)
	subscriptionPackages: SubscriptionPackage[];

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