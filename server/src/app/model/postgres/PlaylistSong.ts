import {Table, Embedded, Column,PrimaryColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");
import {Playlist} from "./Playlist";
import {Song} from "./Song";

@Table("PlaylistSong")
export class PlaylistSong extends PostgresModel {

	@Column()
	addDate: Date;

	@Column()
	pending: boolean;

	@Column()
	playcount: number;

	@Column()
	totalweight: number;

	@Column()
	weight: number;

	//bi-directional many-to-one association to Playlist
	@ManyToOne(type => Playlist, playlist => playlist.playlistSongs, {nullable:false, primary:true})
	playlist: Playlist;
	
	//bi-directional many-to-one association to Song
	@ManyToOne(type => Song, song => song.playlistSongs, {nullable:false, primary:true})
	song: Song;

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