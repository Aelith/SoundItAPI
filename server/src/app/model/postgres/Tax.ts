import {Table, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");

import {SubscriptionPackageDetail} from "./SubscriptionPackageDetail";


@Table()
export class Tax implements PostgresModel {

	@PrimaryGeneratedColumn()
	id: number;
	
	@Column({length: 45})
	label: string;

	@Column()
	rate: number;

	//bi-directional many-to-one association to Subscriptionpackagedetail
	@OneToMany(type => SubscriptionPackageDetail, subscriptionPackageDetail => subscriptionPackageDetail.tax)
	subscriptionPackageDetails: SubscriptionPackageDetail[];

	@CreateDateColumn({default:"NOW()"})
	createTime: Date;

	@UpdateDateColumn({nullable:true})
	updateTime: Date;

	@Column({default:false})
	deleted: boolean;
	
	constructor() {
	}

}