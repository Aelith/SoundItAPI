/**
 * Created by soundit on 17/01/2017.
 */


import DataAccessPostgres = require("../../dataAccess/postgres/DataAccessPostgres");
import BaseRepository = require("./BaseRepository");
import {RoomPlaylist} from "../../model/postgres/RoomPlaylist";


class RoomPlaylistRepository extends BaseRepository<RoomPlaylist> {

    constructor() {
        super(RoomPlaylist);
    }

    findById (id: number, callback: (error: any, result: any) => any)
    {
        return "";
    }

    findByIds (idRoom: number, idPlaylist: number, idPlaylistType: number, callback: (error: any, result: any) => any)
    {
        DataAccessPostgres.connect()
            .getRepository(RoomPlaylist)
            .createQueryBuilder(RoomPlaylist.getTableName())
            .where("\"" + RoomPlaylist.getTableName() + "\".playlist = :idP", {idP: idPlaylist})
            .andWhere("\"" + RoomPlaylist.getTableName() + "\".playlistType = :idPT", {idPT: idPlaylistType})
            .andWhere("\"" + RoomPlaylist.getTableName() + "\".room = :idS", {idS: idRoom})
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
            .getRepository(RoomPlaylist)
            .createQueryBuilder(RoomPlaylist.getTableName())
            .where("\"" + RoomPlaylist.getTableName() + "\".playlist = :idP", {idP: idPlaylist})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findByRoomId (idRoom: number, callback: (error: any, result: any) => any)
    {
        DataAccessPostgres.connect()
            .getRepository(RoomPlaylist)
            .createQueryBuilder(RoomPlaylist.getTableName())
            .where("\"" + RoomPlaylist.getTableName() + "\".room = :idR", {idR: idRoom})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findByPlaylistTypeId (idPlaylistType: number, callback: (error: any, result: any) => any)
    {
        DataAccessPostgres.connect()
            .getRepository(RoomPlaylist)
            .createQueryBuilder(RoomPlaylist.getTableName())
            .where("\"" + RoomPlaylist.getTableName() + "\".playlistType = :idPT", {idR: idPlaylistType})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }


}

export = RoomPlaylistRepository;