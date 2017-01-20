import {Table, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import PostgresModel = require("./interfaces/PostgresModel");
import {SongSource} from "./SongSource";
import {PlaylistSong} from "./PlaylistSong";


@Table("Song")
export class Song extends PostgresModel {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({length: 80, nullable:true})
	album: string;

	@Column({length: 80, nullable:true})
	artist: string;

	@Column({length: 20, nullable:true})
	duration: string;

	@Column({length: 255})
	stream: string;

	@Column({length: 80})
	title: string;

	//bi-directional many-to-one association to Playlistsong
	@OneToMany(type => PlaylistSong, playlistSong => playlistSong.song)
	playlistSongs: PlaylistSong[];
	
	//bi-directional many-to-one association to Songsource
	@ManyToOne(type => SongSource, songSource => songSource.songs, {nullable:false})
	songSource: SongSource;

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