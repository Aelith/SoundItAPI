/**
 * Created by soundit on 17/01/2017.
 */


import DataAccessPostgres = require("../../dataAccess/postgres/DataAccessPostgres");
import BaseRepository = require("./BaseRepository");
import {Playlist} from "../../model/postgres/Playlist";


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



    retrieveHydrated (callback: (error:any, result: any) => any) {

        DataAccessPostgres.connect()
            .getRepository(Playlist)
            .createQueryBuilder(Playlist.getTableName())
            .innerJoinAndSelect(Playlist.getTableName() + ".playlistSongs", "playlistSongs")
            .innerJoinAndSelect(Playlist.getTableName() + ".playlistType", "playlistType")
            .innerJoinAndSelect(Playlist.getTableName() + ".user", "user")
            .innerJoinAndSelect("playlistSongs.song", "song")
            .innerJoinAndSelect("song.songSource", "songSource")
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }


    findHydratedById (idPlaylist: number, callback: (error: any, result: any) => any) {

        DataAccessPostgres.connect()
            .getRepository(Playlist)
            .createQueryBuilder(Playlist.getTableName())
            .innerJoinAndSelect(Playlist.getTableName() + ".playlistSongs", "playlistSongs")
            .innerJoinAndSelect(Playlist.getTableName() + ".playlistType", "playlistType")
            .innerJoinAndSelect(Playlist.getTableName() + ".user", "user")
            .innerJoinAndSelect("playlistSongs.song", "song")
            .innerJoinAndSelect("song.songSource", "songSource")
            .where("\"" + Playlist.getTableName() + "\".id = :idP", {idP: idPlaylist})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }


    findByUserId (idUser: number, callback: (error: any, result: any) => any) {

        DataAccessPostgres.connect()
            .getRepository(Playlist)
            .createQueryBuilder(Playlist.getTableName())
            .where("\"" + Playlist.getTableName() + "\".user = :idU", {idU: idUser})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }


    findHydratedByUserId (idUser: number, callback: (error: any, result: any) => any) {

        DataAccessPostgres.connect()
            .getRepository(Playlist)
            .createQueryBuilder(Playlist.getTableName())
            .innerJoinAndSelect(Playlist.getTableName() + ".playlistSongs", "playlistSongs")
            .innerJoinAndSelect(Playlist.getTableName() + ".playlistType", "playlistType")
            .innerJoinAndSelect(Playlist.getTableName() + ".user", "user")
            .innerJoinAndSelect("playlistSongs.song", "song")
            .innerJoinAndSelect("song.songSource", "songSource")
            .where("\"" + Playlist.getTableName() + "\".user = :idU", {idU: idUser})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }


    findCustomHydratedByUserId (idUser: number, fields: Property[], callback: (error: any, result: any) => any) {

        let QB = DataAccessPostgres.connect()
            .getRepository(Playlist)
            .createQueryBuilder(Playlist.getTableName());


        if (fields.indexOf(Property.PlaylistType) > -1 ) {
            QB.innerJoinAndSelect(Playlist.getTableName() + ".playlistType", "playlistType");
        }
        if (fields.indexOf(Property.User) > -1 ) {
            QB.innerJoinAndSelect(Playlist.getTableName() + ".user", "user");
        }



        if (fields.indexOf(Property.SongSources) > -1) {
            QB
                .innerJoinAndSelect(Playlist.getTableName() + ".playlistSongs", "playlistSongs")
                .innerJoinAndSelect("playlistSongs.song", "song")
                .innerJoinAndSelect("song.songSource", "songSource");
        }
        else if (fields.indexOf(Property.Songs) > -1)
        {
            QB
                .innerJoinAndSelect(Playlist.getTableName() + ".playlistSongs", "playlistSongs")
                .innerJoinAndSelect("playlistSongs.song", "song");
        }
        else if (fields.indexOf(Property.PlaylistSongs) > -1 ) {
            QB.innerJoinAndSelect(Playlist.getTableName() + ".playlistSongs", "playlistSongs");
        }


        QB
            .where("\"" + Playlist.getTableName() + "\".user = :idU", {idU: idUser})
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