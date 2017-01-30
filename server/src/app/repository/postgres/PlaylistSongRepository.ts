/**
 * Created by soundit on 17/01/2017.
 */


import DataAccessPostgres = require("../../dataAccess/postgres/DataAccessPostgres");
import BaseRepository = require("./BaseRepository");
import {PlaylistSong} from "../../model/postgres/PlaylistSong";


class PlaylistSongRepository extends BaseRepository<PlaylistSong> {

    constructor() {
        super(PlaylistSong);
    }

    findById (id:number, callback: (error: any, result: any) => any)
    {
        callback(new Error("Unavailable method"), null);
    }

    findByIds (idPlaylist: number, idSong: number, callback: (error: any, result: any) => any)
    {
        DataAccessPostgres.connect()
            .getRepository(PlaylistSong)
            .createQueryBuilder(PlaylistSong.getTableName())
            .where("\"" + PlaylistSong.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + PlaylistSong.getTableName() + "\".playlist = :idP", {idP: idPlaylist})
            .andWhere("\"" + PlaylistSong.getTableName() + "\".song = :idS", {idS: idSong})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findByPlaylistId (idPlaylist: number, callback: (error: any, result: any) => any)
    {
        DataAccessPostgres.connect()
            .getRepository(PlaylistSong)
            .createQueryBuilder(PlaylistSong.getTableName())
            .where("\"" + PlaylistSong.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + PlaylistSong.getTableName() + "\".playlist = :idP", {idP: idPlaylist})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findBySongId (idSong: number, callback: (error: any, result: any) => any)
    {
        DataAccessPostgres.connect()
            .getRepository(PlaylistSong)
            .createQueryBuilder(PlaylistSong.getTableName())
            .where("\"" + PlaylistSong.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + PlaylistSong.getTableName() + "\".song = :idS", {idS: idSong})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }


    findHydratedByIds (idPlaylist: number, idSong: number, callback: (error: any, result: any) => any)
    {
        DataAccessPostgres.connect()
            .getRepository(PlaylistSong)
            .createQueryBuilder(PlaylistSong.getTableName())
            .leftJoinAndSelect(PlaylistSong.getTableName() + ".playlist", "playlists")
            .leftJoinAndSelect(PlaylistSong.getTableName() + ".song", "songs")
            .where("\"" + PlaylistSong.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + PlaylistSong.getTableName() + "\".playlist = :idP", {idP: idPlaylist})
            .andWhere("\"" + PlaylistSong.getTableName() + "\".song = :idS", {idS: idSong})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findHydratedByPlaylistId (idPlaylist: number, callback: (error: any, result: any) => any)
    {
        DataAccessPostgres.connect()
            .getRepository(PlaylistSong)
            .createQueryBuilder(PlaylistSong.getTableName())
            .leftJoinAndSelect(PlaylistSong.getTableName() + ".playlist", "playlists")
            .leftJoinAndSelect(PlaylistSong.getTableName() + ".song", "songs")
            .where("\"" + PlaylistSong.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + PlaylistSong.getTableName() + "\".playlist = :idP", {idP: idPlaylist})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findHydratedBySongId (idSong: number, callback: (error: any, result: any) => any)
    {
        DataAccessPostgres.connect()
            .getRepository(PlaylistSong)
            .createQueryBuilder(PlaylistSong.getTableName())
            .leftJoinAndSelect(PlaylistSong.getTableName() + ".playlist", "playlists")
            .leftJoinAndSelect(PlaylistSong.getTableName() + ".song", "songs")
            .where("\"" + PlaylistSong.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + PlaylistSong.getTableName() + "\".song = :idS", {idS: idSong})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    retrieveHydrated (callback: (error: any, result: any) => any){

        DataAccessPostgres.connect()
            .getRepository(PlaylistSong)
            .createQueryBuilder(PlaylistSong.getTableName())
            .leftJoinAndSelect(PlaylistSong.getTableName() + ".playlist", "playlists")
            .leftJoinAndSelect(PlaylistSong.getTableName() + ".song", "songs")
            .where("\"" + PlaylistSong.getTableName() + "\".deleted = :deleted", {deleted: false})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }


    deleteByIds(playlistId: number, songId: number, callback: (error: any, result: any) => any){

        DataAccessPostgres.connect()
            .getRepository(PlaylistSong)
            .findOne({playlist:playlistId, song:songId})
            .then(entityToDelete => {
                console.log(entityToDelete);
                DataAccessPostgres.connect()
                    .getRepository(PlaylistSong)
                    .remove(entityToDelete)
                    .then( (entity) => {
                        callback(null, true);
                    })
                    .catch(e => {
                        callback(e, null);
                    });
            })
            .catch(e => {
                console.log(e);
                callback(e, null);
            });
    }

    findNextSongForPlaylist(idPlaylist: number, callback: (error: any, result: any) => any){

        DataAccessPostgres.connect()
            .getRepository(PlaylistSong)
            .createQueryBuilder(PlaylistSong.getTableName())
            .leftJoinAndSelect(PlaylistSong.getTableName() + ".song", "songs")
            .where("\"" + PlaylistSong.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + PlaylistSong.getTableName() + "\".playlist = :idP", {idP: idPlaylist})
            .orderBy("\"" + PlaylistSong.getTableName() + "\".weight", "DESC")
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }


    // Playlist by IdPlaylist, Room, User
}

export = PlaylistSongRepository;