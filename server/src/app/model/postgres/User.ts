import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");

import {Address} from "./Address";
import {KnownUser} from "./KnownUser";
import {Playlist} from "./Playlist";
import {RoomTemplate} from "./RoomTemplate";
import {RoomUser} from "./RoomUser";
import {SubscriptionPackage} from "./SubscriptionPackage";
import {LoginType} from "./LoginType";
import {UserType} from "./UserType";
import {UserRight} from "./UserRight";


@Entity("User")
export class User extends PostgresModel {

	@PrimaryGeneratedColumn()
    id: number;

	@Column({length: 30, nullable:true})
	cellphoneNumber: string;

	@Column({length: 100})
	email: string;

	@Column({length: 100, nullable:true})
	externalId: string;

	@Column({length: 80})
	firstName: string;

	@Column({length: 80})
	lastName: string;

	@Column({length: 45})
	login: string;

	@Column({length: 120})
	password: string;

	@Column({length: 30, nullable:true})
	phoneNumber: string;

	@Column({length: 45})
	salt: string;
	
	//bi-directional many-to-one association to Address
	@OneToMany(type => Address, address => address.user)
	addresses: Address[];


	//bi-directional many-to-one association to Knownuser
	@OneToMany(type => KnownUser, knownUser => knownUser.user)
	knownUsers: KnownUser[];

	//bi-directional many-to-one association to Playlist
	@OneToMany(type => Playlist, playlist => playlist.user)
	playlists: Playlist[];
	
	//bi-directional many-to-one association to Roomtemplate
	@OneToMany(type => RoomTemplate, roomTemplate => roomTemplate.user)
	roomTemplates: RoomTemplate[];
	
	//bi-directional many-to-one association to Roomuser
	@OneToMany(type => RoomUser, roomUser => roomUser.user)
	roomUsers: RoomUser[];
	
	//bi-directional many-to-one association to Subscriptionpackage
	@OneToMany(type => SubscriptionPackage, subscriptionPackage => subscriptionPackage.user)
	subscriptionPackages: SubscriptionPackage[];
	
	//bi-directional many-to-one association to Logintype
	@ManyToOne(type => LoginType, loginType => loginType.users, {nullable:false})
	loginType: LoginType;
	
	//bi-directional many-to-one association to Usertype
	@ManyToOne(type => UserType, userType => userType.users, {nullable:false})
	userType: UserType;
	
	//bi-directional many-to-many association to Userright
	@ManyToMany(type => UserRight, userRight => userRight.users)
	userRights: UserRight[];

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