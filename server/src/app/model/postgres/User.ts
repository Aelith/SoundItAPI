import {Table, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Address} from "./Address";
import PostgresModel = require("./interfaces/PostgresModel");


@Table()
export class User implements PostgresModel {
	@PrimaryGeneratedColumn()
    id: number;

	@Column({length: 30})
	cellphoneNumber: string;

	@Column({length: 100})
	email: string;

	@Column({length: 100})
	externalId: string;

	@Column({length: 80})
	firstName: string;

	@Column({length: 80})
	lastName: string;

	@Column({length: 45})
	login: string;

	@Column({length: 120})
	password: string;

	@Column({length: 30})
	phoneNumber: string;

	@Column({length: 45})
	salt: string;


	//bi-directional many-to-one association to Address
	@OneToMany(type => Address, address => address.user)
	addresses: Address[];


	@CreateDateColumn()
	createTime: Date; //TimeStamp;

	@UpdateDateColumn({nullable: true})
	updateTime: Date; //TimeStamp;

	@Column()
	deleted: boolean;


	/*

	
	//bi-directional many-to-one association to Knownuser
	@OneToMany(mappedBy="user")
	private List<Knownuser> knownusers;

	//bi-directional many-to-one association to Playlist
	@OneToMany(mappedBy="user")
	private List<Playlist> playlists;

	//bi-directional many-to-one association to Roomtemplate
	@OneToMany(mappedBy="user")
	private List<Roomtemplate> roomtemplates;

	//bi-directional many-to-one association to Roomuser
	@OneToMany(mappedBy="user")
	private List<Roomuser> roomusers;

	//bi-directional many-to-one association to Subscriptionpackage
	@OneToMany(mappedBy="user")
	private List<Subscriptionpackage> subscriptionpackages;

	//bi-directional many-to-one association to Logintype
	@ManyToOne
	@JoinColumn(name="fk_idlogintype")
	private Logintype logintype;

	//bi-directional many-to-one association to Usertype
	@ManyToOne
	@JoinColumn(name="fk_idusertype")
	private Usertype usertype;

	//bi-directional many-to-many association to Userright
	@ManyToMany(mappedBy="users")
	private List<Userright> userrights;

	*/
	
	constructor() {
		
	}

}