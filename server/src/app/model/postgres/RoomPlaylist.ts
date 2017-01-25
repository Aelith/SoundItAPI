import {Entity, Embedded, Column, PrimaryColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");
import {Room} from "./Room";
import {Playlist} from "./Playlist";
import {PlaylistType} from "./PlaylistType";


@Entity("RoomPlaylist")
export class RoomPlaylist extends PostgresModel {

	//bi-directional many-to-one association to Playlist
	@ManyToOne(type => Playlist, playlist => playlist.roomPlaylists, {nullable:false, primary:true})
	playlist: Playlist;

	//bi-directional many-to-one association to Playlisttype
	@ManyToOne(type => PlaylistType, playlistType => playlistType.roomPlaylists, {nullable:false, primary:true})
	playlistType: PlaylistType;

	//bi-directional many-to-one association to Room
	@ManyToOne(type => Room, room => room.roomPlaylists, {nullable:false, primary:true})
	room: Room;

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