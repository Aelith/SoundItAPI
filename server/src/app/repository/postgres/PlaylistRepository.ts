/**
 * Created by soundit on 17/01/2017.
 */


import DataAccessPostgres = require("../../dataAccess/postgres/DataAccessPostgres");
import BaseRepository = require("./BaseRepository");
import {Playlist} from "../../model/postgres/Playlist";
import {User} from "../../model/postgres/User";


enum Property {
    PlaylistType,
    PlaylistSongs,
    User,
    Songs,
    SongSources
}


class PlaylistRepository extends BaseRepository<Playlist> {

    public static readonly eProperty = Property;

    constructor() {
        super(Playlist);
    }


    /************  ***********/
    /******* Retrieve ********/
    /************  ***********/


    /**
     * Retrieve all playlists, fully hydrated
     * @param callback
     */
    retrieveHydrated (callback: (error:any, result: any) => any) {

        DataAccessPostgres.connect()
            .getRepository(Playlist)
            .createQueryBuilder(Playlist.getTableName())
            .leftJoinAndSelect(Playlist.getTableName() + ".playlistSongs", "playlistSongs")
            .leftJoinAndSelect(Playlist.getTableName() + ".playlistType", "playlistType")
            .leftJoinAndSelect(Playlist.getTableName() + ".user", "user")
            .leftJoinAndSelect("playlistSongs.song", "song")
            .leftJoinAndSelect("song.songSource", "songSource")
            .where("\"" + Playlist.getTableName() + "\".deleted = :deleted", {deleted: false})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    /**
     * Retrieve all playlists, hydrated with chosen fields
     * @param fields
     * @param callback
     */
    retrieveCustomHydrated (fields: Property[], callback: (error: any, result: any) => any) {

        let QB = DataAccessPostgres.connect()
            .getRepository(Playlist)
            .createQueryBuilder(Playlist.getTableName());


        if (fields.indexOf(Property.PlaylistType) > -1 ) {
            QB.leftJoinAndSelect(Playlist.getTableName() + ".playlistType", "playlistType");
        }
        if (fields.indexOf(Property.User) > -1 ) {
            QB.leftJoinAndSelect(Playlist.getTableName() + ".user", "user");
        }



        if (fields.indexOf(Property.SongSources) > -1) {
            QB
                .leftJoinAndSelect(Playlist.getTableName() + ".playlistSongs", "playlistSongs")
                .leftJoinAndSelect("playlistSongs.song", "song")
                .leftJoinAndSelect("song.songSource", "songSource");
        }
        else if (fields.indexOf(Property.Songs) > -1)
        {
            QB
                .leftJoinAndSelect(Playlist.getTableName() + ".playlistSongs", "playlistSongs")
                .leftJoinAndSelect("playlistSongs.song", "song");
        }
        else if (fields.indexOf(Property.PlaylistSongs) > -1 ) {
            QB.leftJoinAndSelect(Playlist.getTableName() + ".playlistSongs", "playlistSongs");
        }


        QB
            .where("\"" + Playlist.getTableName() + "\".deleted = :deleted", {deleted: false})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }


    /***********  ***********/
    /******** By Id *********/
    /***********  ***********/

    /**
     * Retrieve fully hydrated playlists by id
     * @param idPlaylist
     * @param callback
     */
    findHydratedById (idPlaylist: number, callback: (error: any, result: any) => any) {

        DataAccessPostgres.connect()
            .getRepository(Playlist)
            .createQueryBuilder(Playlist.getTableName())
            .leftJoinAndSelect(Playlist.getTableName() + ".playlistSongs", "playlistSongs")
            .leftJoinAndSelect(Playlist.getTableName() + ".playlistType", "playlistType")
            .leftJoinAndSelect(Playlist.getTableName() + ".user", "user")
            .leftJoinAndSelect("playlistSongs.song", "song")
            .leftJoinAndSelect("song.songSource", "songSource")
            .where("\"" + Playlist.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + Playlist.getTableName() + "\".id = :idP", {idP: idPlaylist})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    /**
     * Retrieve hydrated playlists with chosen fields by id
     * @param idPlaylist
     * @param fields
     * @param callback
     */
    findCustomHydratedById (idPlaylist: number, fields: Property[], callback: (error: any, result: any) => any) {

        let QB = DataAccessPostgres.connect()
            .getRepository(Playlist)
            .createQueryBuilder(Playlist.getTableName());


        if (fields.indexOf(Property.PlaylistType) > -1 ) {
            QB.leftJoinAndSelect(Playlist.getTableName() + ".playlistType", "playlistType");
        }
        if (fields.indexOf(Property.User) > -1 ) {
            QB.leftJoinAndSelect(Playlist.getTableName() + ".user", "user");
        }



        if (fields.indexOf(Property.SongSources) > -1) {
            QB
                .leftJoinAndSelect(Playlist.getTableName() + ".playlistSongs", "playlistSongs")
                .leftJoinAndSelect("playlistSongs.song", "song")
                .leftJoinAndSelect("song.songSource", "songSource");
        }
        else if (fields.indexOf(Property.Songs) > -1)
        {
            QB
                .leftJoinAndSelect(Playlist.getTableName() + ".playlistSongs", "playlistSongs")
                .leftJoinAndSelect("playlistSongs.song", "song");
        }
        else if (fields.indexOf(Property.PlaylistSongs) > -1 ) {
            QB.leftJoinAndSelect(Playlist.getTableName() + ".playlistSongs", "playlistSongs");
        }


        QB
            .where("\"" + Playlist.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + Playlist.getTableName() + "\".id = :idP", {idP: idPlaylist})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }




    /***********  ***********/
    /****** By User Id ******/
    /***********  ***********/

    /**
     * Retrieve playlists by user id
     * @param idUser
     * @param callback
     */
    findByUserId (idUser: number, callback: (error: any, result: any) => any) {

        DataAccessPostgres.connect()
            .getRepository(Playlist)
            .createQueryBuilder(Playlist.getTableName())
            .where("\"" + Playlist.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + Playlist.getTableName() + "\".user = :idU", {idU: idUser})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    /**
     * Retrieve fully hydrated playlists by user id
     * @param idUser
     * @param callback
     */
    findHydratedByUserId (idUser: number, callback: (error: any, result: any) => any) {

        DataAccessPostgres.connect()
            .getRepository(Playlist)
            .createQueryBuilder(Playlist.getTableName())
            .leftJoinAndSelect(Playlist.getTableName() + ".playlistSongs", "playlistSongs")
            .leftJoinAndSelect(Playlist.getTableName() + ".playlistType", "playlistType")
            .leftJoinAndSelect(Playlist.getTableName() + ".user", "user")
            .leftJoinAndSelect("playlistSongs.song", "song")
            .leftJoinAndSelect("song.songSource", "songSource")
            .where("\"" + Playlist.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + Playlist.getTableName() + "\".user = :idU", {idU: idUser})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }


    /**
     * Retrieve hydrated playlists with chosen fields by user id
     * @param idUser
     * @param fields
     * @param callback
     */
    findCustomHydratedByUserId (idUser: number, fields: Property[], callback: (error: any, result: any) => any) {

        let QB = DataAccessPostgres.connect()
            .getRepository(Playlist)
            .createQueryBuilder(Playlist.getTableName());


        if (fields.indexOf(Property.PlaylistType) > -1 ) {
            QB.leftJoinAndSelect(Playlist.getTableName() + ".playlistType", "playlistType");
        }
        if (fields.indexOf(Property.User) > -1 ) {
            QB.leftJoinAndSelect(Playlist.getTableName() + ".user", "user");
        }



        if (fields.indexOf(Property.SongSources) > -1) {
            QB
                .leftJoinAndSelect(Playlist.getTableName() + ".playlistSongs", "playlistSongs")
                .leftJoinAndSelect("playlistSongs.song", "song")
                .leftJoinAndSelect("song.songSource", "songSource");
        }
        else if (fields.indexOf(Property.Songs) > -1)
        {
            QB
                .leftJoinAndSelect(Playlist.getTableName() + ".playlistSongs", "playlistSongs")
                .leftJoinAndSelect("playlistSongs.song", "song");
        }
        else if (fields.indexOf(Property.PlaylistSongs) > -1 ) {
            QB.leftJoinAndSelect(Playlist.getTableName() + ".playlistSongs", "playlistSongs");
        }


        QB
            .where("\"" + Playlist.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + Playlist.getTableName() + "\".user = :idU", {idU: idUser})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }


    /**
     * Find Unused Playlists
     */

    /**
     * Retrieve unset playlists by user id
     * @param idUser
     * @param callback
     */
    findUnusedByUserId (idUser: number, callback: (error: any, result: any) => any) {

        let sql =   'SELECT rp.playlist ' +
                    'FROM "User" u ' +
                    'LEFT JOIN "RoomTemplate" rt ON u.id = rt.user ' +
                    'LEFT JOIN "Room" r ON rt.id = r."roomTemplate" ' +
                    'LEFT JOIN "RoomPlaylist" rp ON r.id = rp.room ' +
                    'WHERE r.active = true ' +
                    'AND u.id = ' + idUser + ' ' +
                    'AND r.deleted = false';

        DataAccessPostgres.connect()
            .getRepository(Playlist)
            .createQueryBuilder(Playlist.getTableName())
            .where("\"" + Playlist.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + Playlist.getTableName() + "\".user = :idU", {idU: idUser})
            .andWhere("\"" + Playlist.getTableName() + "\".id NOT IN ("+ sql +")", {} )
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

}




export = PlaylistRepository;