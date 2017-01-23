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
        return "";
    }

    findByIds (idPlaylist: number, idSong: number, callback: (error: any, result: any) => any)
    {
        DataAccessPostgres.connect()
            .getRepository(PlaylistSong)
            .createQueryBuilder(PlaylistSong.getTableName())
            .where("\"" + PlaylistSong.getTableName() + "\".playlist = :idP", {idP: idPlaylist})
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
            .where("\"" + PlaylistSong.getTableName() + "\".playlist = :idP", {idP: idPlaylist})
            .getOne()
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
            .where("\"" + PlaylistSong.getTableName() + "\".song = :idS", {idS: idSong})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }
}

export = PlaylistSongRepository;