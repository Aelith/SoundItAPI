import {Table, Column, PrimaryColumn, Embedded, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");

import {SubscriptionPackageDetail} from "./SubscriptionPackageDetail";
import {SubscriptionPackageState} from "./SubscriptionPackageState";
import {User} from "./User";


@Table("SubscriptionPackage")
export class SubscriptionPackage extends PostgresModel {

	@PrimaryColumn()
	beginTime: Date;
	
	@Column()
	endTime: Date;

	@Column()
	price:number;

	@Column()
	totalDuration: number;
	
	

	//bi-directional many-to-one association to Subscriptionpackagedetail
	@ManyToOne(type => SubscriptionPackageDetail,  subscriptionPackageDetail => subscriptionPackageDetail.subscriptionPackages, {nullable:false, primary:true})
	subscriptionPackageDetail: SubscriptionPackageDetail;

	//bi-directional many-to-one association to Subscriptionpackagestate
	@ManyToOne(type => SubscriptionPackageState,  subscriptionPackageState => subscriptionPackageState.subscriptionPackages, {nullable:false, primary:true})
	subscriptionPackageState: SubscriptionPackageState;

	//bi-directional many-to-one association to User
	@ManyToOne(type => User, user => user.subscriptionPackages, {nullable:false, primary:true})
	user: User;

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