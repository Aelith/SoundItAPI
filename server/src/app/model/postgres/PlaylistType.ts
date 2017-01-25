import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");
import {Playlist} from "./Playlist";
import {RoomPlaylist} from "./RoomPlaylist";

@Entity("PlaylistType")
export class PlaylistType extends PostgresModel {

	@PrimaryGeneratedColumn()
    id: number;

	@Column({length: 45})
	label: string;
	
	//bi-directional many-to-one association to Playlist
	@OneToMany(type => Playlist, playlist => playlist.playlistType)
	playlists: Playlist[];

	//bi-directional many-to-one association to Roomplaylist
	@OneToMany(type => RoomPlaylist, roomPlaylist => roomPlaylist.playlistType)
	roomPlaylists: RoomPlaylist[];

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