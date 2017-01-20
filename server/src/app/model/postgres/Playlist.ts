import {Table, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");
import {User} from "./User";
import {PlaylistType} from "./PlaylistType";
import {PlaylistSong} from "./PlaylistSong";
import {RoomPlaylist} from "./RoomPlaylist";

@Table()
export class Playlist implements PostgresModel {

	@PrimaryGeneratedColumn()
    id: number;

	@Column("text")
	description: string;

	@Column({length: 45})
	name: string;

	@Column("text")
	songRank: string;

	@Column()
	temporary: boolean;

	//bi-directional many-to-one association to Playlisttype
	@ManyToOne(type => PlaylistType, playlistType => playlistType.playlists, {nullable: false})
	playlistType: PlaylistType;
	
	//bi-directional many-to-one association to User
	@ManyToOne(type => User, user => user.playlists, {nullable: false})
	user: User;

	//bi-directional many-to-one association to Playlistsong
	@OneToMany(type => PlaylistSong, playlistSong => playlistSong.playlist, {nullable: false})
	playlistSongs: PlaylistSong[];

	//bi-directional many-to-one association to Roomplaylist
	@OneToMany(type => RoomPlaylist, roomPlaylist => roomPlaylist.playlist, {nullable: false})
	roomPlaylists: RoomPlaylist[];

	@CreateDateColumn({default:"NOW()"})
	createTime: Date;

	@UpdateDateColumn({nullable:true})
	updateTime: Date;

	@Column({default:false})
	deleted: boolean;
	
	constructor() {
	}

}