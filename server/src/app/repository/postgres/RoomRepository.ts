/**
 * Created by soundit on 17/01/2017.
 */


import DataAccessPostgres = require("../../dataAccess/postgres/DataAccessPostgres");
import BaseRepository = require("./BaseRepository");
import {Room} from "../../model/postgres/Room";

enum Property {
    RoomUser,
    RoomUserUser,
    RoomPlaylist,
    RoomPlaylistPlaylist,
    RoomPlaylistPlaylistType,
    PlaylistPlaylistType,
    Tags,
    RoomTemplate,
    RoomTemplateTag,
    RoomTemplateOwner,
    UserGroup,
    UserGroupRoomRight,
    RoomRight
}

class RoomRepository extends BaseRepository<Room> {

    public static readonly eProperty = Property;

    constructor() {
        super(Room);
    }


    /********* ********/
    /**** Retrieve ****/
    /********* ********/

    retrieveHydrated (callback: (error: any, result: any) => any){
        DataAccessPostgres.connect()
            .getRepository(Room)
            .createQueryBuilder(Room.getTableName())
            .leftJoinAndSelect(Room.getTableName() + ".roomUsers", "roomUsers")
            .leftJoinAndSelect("roomUsers.user", "user")
            .leftJoinAndSelect(Room.getTableName() + ".roomPlaylists", "roomPlaylists")
            .leftJoinAndSelect("roomPlaylists.playlist", "roomPlaylistsPlaylist")
            .leftJoinAndSelect("roomPlaylistsPlaylist.playlistType", "roomPlaylistsPlaylistPlaylistType")
            .leftJoinAndSelect("roomPlaylists.playlistType", "roomPlaylistsPlaylistType")
            .leftJoinAndSelect(Room.getTableName() + ".roomTemplate", "roomTemplate")
            .leftJoinAndSelect("roomTemplate.tags", "roomTemplateTags")
            .leftJoinAndSelect("roomTemplate.user", "roomTemplateOwner")
            .leftJoinAndSelect(Room.getTableName() + ".tags", "tags")
            .leftJoinAndSelect(Room.getTableName() + ".userGroup", "userGroup")
            .leftJoinAndSelect("userGroup.roomRights", "roomRights")
            .where("\"" + Room.getTableName() + "\".deleted = :deleted", {deleted: false})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    retrieveCustomHydrated (fields: Property[], callback: (error: any, result: any) => any){
        let QB = DataAccessPostgres.connect()
            .getRepository(Room)
            .createQueryBuilder(Room.getTableName());


        if (fields.indexOf(Property.RoomUserUser) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".roomUsers", "roomUsers")
                .leftJoinAndSelect("roomUsers.user", "user");
        }
        else if (fields.indexOf(Property.RoomUser) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".roomUsers", "roomUsers");
        }



        if (fields.indexOf(Property.RoomPlaylist) > -1 ||
            fields.indexOf(Property.RoomPlaylistPlaylist) > -1 ||
            fields.indexOf(Property.RoomPlaylistPlaylistType) > -1 ||
            fields.indexOf(Property.PlaylistPlaylistType) > -1 ) {

            QB.leftJoinAndSelect(Room.getTableName() + ".roomPlaylists", "roomPlaylists");

        }


        if (fields.indexOf(Property.RoomPlaylistPlaylistType) > -1) {
            QB
                .leftJoinAndSelect("roomPlaylists.playlist", "roomPlaylistsPlaylist")
                .leftJoinAndSelect("roomPlaylistsPlaylist.playlistType", "roomPlaylistsPlaylistPlaylistType");

        }
        else if (fields.indexOf(Property.RoomPlaylistPlaylist) > -1) {
            QB
                .leftJoinAndSelect("roomPlaylists.playlist", "roomPlaylistsPlaylist");
        }


        if (fields.indexOf(Property.PlaylistPlaylistType) > -1) {
            QB
                .leftJoinAndSelect("roomPlaylists.playlistType", "roomPlaylistsPlaylistType");
        }


        if (fields.indexOf(Property.RoomTemplate) > -1 ||
            fields.indexOf(Property.RoomTemplateOwner) > -1 ||
            fields.indexOf(Property.RoomTemplateTag) > -1 ) {

            QB
                .leftJoinAndSelect(Room.getTableName() + ".roomTemplate", "roomTemplate");

        }


        if (fields.indexOf(Property.RoomTemplateOwner) > -1) {
            QB
                .leftJoinAndSelect("roomTemplate.user", "roomTemplateOwner");
        }

        if (fields.indexOf(Property.RoomTemplateTag) > -1) {
            QB
                .leftJoinAndSelect("roomTemplate.tags", "roomTemplateTags");
        }



        if (fields.indexOf(Property.Tags) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".tags", "tags");
        }

        if (fields.indexOf(Property.UserGroupRoomRight) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".userGroup", "userGroup")
                .leftJoinAndSelect("userGroup.roomRights", "roomRights");
        }
        else if (fields.indexOf(Property.UserGroup) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".userGroup", "userGroup");
        }


        QB
            .where("\"" + Room.getTableName() + "\".deleted = :deleted", {deleted: false})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }


    /********* ********/
    /*** Find By Id ***/
    /********* ********/

    findHydratedById (id: number, callback: (error: any, result: any) => any){
        DataAccessPostgres.connect()
            .getRepository(Room)
            .createQueryBuilder(Room.getTableName())
            .leftJoinAndSelect(Room.getTableName() + ".roomUsers", "roomUsers")
            .leftJoinAndSelect("roomUsers.user", "user")
            .leftJoinAndSelect(Room.getTableName() + ".roomPlaylists", "roomPlaylists")
            .leftJoinAndSelect("roomPlaylists.playlist", "roomPlaylistsPlaylist")
            .leftJoinAndSelect("roomPlaylistsPlaylist.playlistType", "roomPlaylistsPlaylistPlaylistType")
            .leftJoinAndSelect("roomPlaylists.playlistType", "roomPlaylistsPlaylistType")
            .leftJoinAndSelect(Room.getTableName() + ".roomTemplate", "roomTemplate")
            .leftJoinAndSelect("roomTemplate.tags", "roomTemplateTags")
            .leftJoinAndSelect(Room.getTableName() + ".tags", "tags")
            .leftJoinAndSelect(Room.getTableName() + ".userGroup", "userGroup")
            .leftJoinAndSelect("userGroup.roomRights", "roomRights")
            .where("\"" + Room.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + Room.getTableName() + "\".id = :id", {id: id})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findCustomHydratedById (id: number, fields: Property[], callback: (error: any, result: any) => any){
        let QB = DataAccessPostgres.connect()
            .getRepository(Room)
            .createQueryBuilder(Room.getTableName());


        if (fields.indexOf(Property.RoomUserUser) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".roomUsers", "roomUsers")
                .leftJoinAndSelect("roomUsers.user", "user");
        }
        else if (fields.indexOf(Property.RoomUser) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".roomUsers", "roomUsers");
        }



        if (fields.indexOf(Property.RoomPlaylist) > -1 ||
            fields.indexOf(Property.RoomPlaylistPlaylist) > -1 ||
            fields.indexOf(Property.RoomPlaylistPlaylistType) > -1 ||
            fields.indexOf(Property.PlaylistPlaylistType) > -1 ) {

            QB.leftJoinAndSelect(Room.getTableName() + ".roomPlaylists", "roomPlaylists");

        }


        if (fields.indexOf(Property.RoomPlaylistPlaylistType) > -1) {
            QB
                .leftJoinAndSelect("roomPlaylists.playlist", "roomPlaylistsPlaylist")
                .leftJoinAndSelect("roomPlaylistsPlaylist.playlistType", "roomPlaylistsPlaylistPlaylistType");

        }
        else if (fields.indexOf(Property.RoomPlaylistPlaylist) > -1) {
            QB
                .leftJoinAndSelect("roomPlaylists.playlist", "roomPlaylistsPlaylist");
        }


        if (fields.indexOf(Property.PlaylistPlaylistType) > -1) {
            QB
                .leftJoinAndSelect("roomPlaylists.playlistType", "roomPlaylistsPlaylistType");
        }


        if (fields.indexOf(Property.RoomTemplate) > -1 ||
            fields.indexOf(Property.RoomTemplateOwner) > -1 ||
            fields.indexOf(Property.RoomTemplateTag) > -1 ) {

            QB
                .leftJoinAndSelect(Room.getTableName() + ".roomTemplate", "roomTemplate");

        }


        if (fields.indexOf(Property.RoomTemplateOwner) > -1) {
            QB
                .leftJoinAndSelect("roomTemplate.user", "roomTemplateOwner");
        }

        if (fields.indexOf(Property.RoomTemplateTag) > -1) {
            QB
                .leftJoinAndSelect("roomTemplate.tags", "roomTemplateTags");
        }



        if (fields.indexOf(Property.Tags) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".tags", "tags");
        }

        if (fields.indexOf(Property.UserGroupRoomRight) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".userGroup", "userGroup")
                .leftJoinAndSelect("userGroup.roomRights", "roomRights");
        }
        else if (fields.indexOf(Property.UserGroup) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".userGroup", "userGroup");
        }


        QB
            .where("\"" + Room.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + Room.getTableName() + "\".id = :id", {id: id})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }



    /********** *********/
    /*** Find By User ***/
    /********** *********/


    findByUser (userId: number, callback: (error: any, result: any) => any){
        DataAccessPostgres.connect()
            .getRepository(Room)
            .createQueryBuilder(Room.getTableName())
            .leftJoin(Room.getTableName() + ".roomTemplate", "roomTemplate")
            .where("\"" + Room.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"roomTemplate\".user = :user", {user: userId})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findHydratedByUser (userId: number, callback: (error: any, result: any) => any){
        DataAccessPostgres.connect()
            .getRepository(Room)
            .createQueryBuilder(Room.getTableName())
            .leftJoinAndSelect(Room.getTableName() + ".roomUsers", "roomUsers")
            .leftJoinAndSelect("roomUsers.user", "user")
            .leftJoinAndSelect(Room.getTableName() + ".roomPlaylists", "roomPlaylists")
            .leftJoinAndSelect("roomPlaylists.playlist", "roomPlaylistsPlaylist")
            .leftJoinAndSelect("roomPlaylistsPlaylist.playlistType", "roomPlaylistsPlaylistPlaylistType")
            .leftJoinAndSelect("roomPlaylists.playlistType", "roomPlaylistsPlaylistType")
            .leftJoinAndSelect(Room.getTableName() + ".roomTemplate", "roomTemplate")
            .leftJoinAndSelect("roomTemplate.tags", "roomTemplateTags")
            .leftJoinAndSelect(Room.getTableName() + ".tags", "tags")
            .leftJoinAndSelect(Room.getTableName() + ".userGroup", "userGroup")
            .leftJoinAndSelect("userGroup.roomRights", "roomRights")
            .where("\"" + Room.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"roomTemplate\".user = :user", {user: userId})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findCustomHydratedByUser (userId: number, fields: Property[], callback: (error: any, result: any) => any){
        let QB = DataAccessPostgres.connect()
            .getRepository(Room)
            .createQueryBuilder(Room.getTableName());


        if (fields.indexOf(Property.RoomUserUser) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".roomUsers", "roomUsers")
                .leftJoinAndSelect("roomUsers.user", "user");
        }
        else if (fields.indexOf(Property.RoomUser) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".roomUsers", "roomUsers");
        }



        if (fields.indexOf(Property.RoomPlaylist) > -1 ||
            fields.indexOf(Property.RoomPlaylistPlaylist) > -1 ||
            fields.indexOf(Property.RoomPlaylistPlaylistType) > -1 ||
            fields.indexOf(Property.PlaylistPlaylistType) > -1 ) {

            QB.leftJoinAndSelect(Room.getTableName() + ".roomPlaylists", "roomPlaylists");

        }


        if (fields.indexOf(Property.RoomPlaylistPlaylistType) > -1) {
            QB
                .leftJoinAndSelect("roomPlaylists.playlist", "roomPlaylistsPlaylist")
                .leftJoinAndSelect("roomPlaylistsPlaylist.playlistType", "roomPlaylistsPlaylistPlaylistType");

        }
        else if (fields.indexOf(Property.RoomPlaylistPlaylist) > -1) {
            QB
                .leftJoinAndSelect("roomPlaylists.playlist", "roomPlaylistsPlaylist");
        }


        if (fields.indexOf(Property.PlaylistPlaylistType) > -1) {
            QB
                .leftJoinAndSelect("roomPlaylists.playlistType", "roomPlaylistsPlaylistType");
        }


        if (fields.indexOf(Property.RoomTemplate) > -1 ||
            fields.indexOf(Property.RoomTemplateOwner) > -1 ||
            fields.indexOf(Property.RoomTemplateTag) > -1 ) {

            QB
                .leftJoinAndSelect(Room.getTableName() + ".roomTemplate", "roomTemplate");

        }
        else
        {
            QB
                .leftJoin(Room.getTableName() + ".roomTemplate", "roomTemplate");
        }


        if (fields.indexOf(Property.RoomTemplateOwner) > -1) {
            QB
                .leftJoinAndSelect("roomTemplate.user", "roomTemplateOwner");
        }

        if (fields.indexOf(Property.RoomTemplateTag) > -1) {
            QB
                .leftJoinAndSelect("roomTemplate.tags", "roomTemplateTags");
        }



        if (fields.indexOf(Property.Tags) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".tags", "tags");
        }

        if (fields.indexOf(Property.UserGroupRoomRight) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".userGroup", "userGroup")
                .leftJoinAndSelect("userGroup.roomRights", "roomRights");
        }
        else if (fields.indexOf(Property.UserGroup) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".userGroup", "userGroup");
        }


        QB
            .where("\"" + Room.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"roomTemplate\".user = :user", {user: userId})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }



    /************* *************/
    /*** Find Active By User ***/
    /************* *************/

    findActiveByUser (userId: number, callback: (error: any, result: any) => any){
        DataAccessPostgres.connect()
            .getRepository(Room)
            .createQueryBuilder(Room.getTableName())
            .leftJoin(Room.getTableName() + ".roomTemplate", "roomTemplate")
            .where("\"" + Room.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + Room.getTableName() + "\".active = :active", {active: true})
            .andWhere("\"roomTemplate\".user = :user", {user: userId})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findActiveHydratedByUser (userId: number, callback: (error: any, result: any) => any){
        DataAccessPostgres.connect()
            .getRepository(Room)
            .createQueryBuilder(Room.getTableName())
            .leftJoinAndSelect(Room.getTableName() + ".roomUsers", "roomUsers")
            .leftJoinAndSelect("roomUsers.user", "user")
            .leftJoinAndSelect(Room.getTableName() + ".roomPlaylists", "roomPlaylists")
            .leftJoinAndSelect("roomPlaylists.playlist", "roomPlaylistsPlaylist")
            .leftJoinAndSelect("roomPlaylistsPlaylist.playlistType", "roomPlaylistsPlaylistPlaylistType")
            .leftJoinAndSelect("roomPlaylists.playlistType", "roomPlaylistsPlaylistType")
            .leftJoinAndSelect(Room.getTableName() + ".roomTemplate", "roomTemplate")
            .leftJoinAndSelect("roomTemplate.tags", "roomTemplateTags")
            .leftJoinAndSelect(Room.getTableName() + ".tags", "tags")
            .leftJoinAndSelect(Room.getTableName() + ".userGroup", "userGroup")
            .leftJoinAndSelect("userGroup.roomRights", "roomRights")
            .where("\"" + Room.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + Room.getTableName() + "\".active = :active", {active: true})
            .andWhere("\"roomTemplate\".user = :user", {user: userId})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findActiveCustomHydratedByUser (userId: number, fields: Property[], callback: (error: any, result: any) => any){
        let QB = DataAccessPostgres.connect()
            .getRepository(Room)
            .createQueryBuilder(Room.getTableName());


        if (fields.indexOf(Property.RoomUserUser) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".roomUsers", "roomUsers")
                .leftJoinAndSelect("roomUsers.user", "user");
        }
        else if (fields.indexOf(Property.RoomUser) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".roomUsers", "roomUsers");
        }



        if (fields.indexOf(Property.RoomPlaylist) > -1 ||
            fields.indexOf(Property.RoomPlaylistPlaylist) > -1 ||
            fields.indexOf(Property.RoomPlaylistPlaylistType) > -1 ||
            fields.indexOf(Property.PlaylistPlaylistType) > -1 ) {

            QB.leftJoinAndSelect(Room.getTableName() + ".roomPlaylists", "roomPlaylists");

        }


        if (fields.indexOf(Property.RoomPlaylistPlaylistType) > -1) {
            QB
                .leftJoinAndSelect("roomPlaylists.playlist", "roomPlaylistsPlaylist")
                .leftJoinAndSelect("roomPlaylistsPlaylist.playlistType", "roomPlaylistsPlaylistPlaylistType");

        }
        else if (fields.indexOf(Property.RoomPlaylistPlaylist) > -1) {
            QB
                .leftJoinAndSelect("roomPlaylists.playlist", "roomPlaylistsPlaylist");
        }


        if (fields.indexOf(Property.PlaylistPlaylistType) > -1) {
            QB
                .leftJoinAndSelect("roomPlaylists.playlistType", "roomPlaylistsPlaylistType");
        }


        if (fields.indexOf(Property.RoomTemplate) > -1 ||
            fields.indexOf(Property.RoomTemplateOwner) > -1 ||
            fields.indexOf(Property.RoomTemplateTag) > -1 ) {

            QB
                .leftJoinAndSelect(Room.getTableName() + ".roomTemplate", "roomTemplate");

        }
        else
        {
            QB
                .leftJoin(Room.getTableName() + ".roomTemplate", "roomTemplate");
        }


        if (fields.indexOf(Property.RoomTemplateOwner) > -1) {
            QB
                .leftJoinAndSelect("roomTemplate.user", "roomTemplateOwner");
        }

        if (fields.indexOf(Property.RoomTemplateTag) > -1) {
            QB
                .leftJoinAndSelect("roomTemplate.tags", "roomTemplateTags");
        }



        if (fields.indexOf(Property.Tags) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".tags", "tags");
        }

        if (fields.indexOf(Property.UserGroupRoomRight) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".userGroup", "userGroup")
                .leftJoinAndSelect("userGroup.roomRights", "roomRights");
        }
        else if (fields.indexOf(Property.UserGroup) > -1) {
            QB
                .leftJoinAndSelect(Room.getTableName() + ".userGroup", "userGroup");
        }


        QB
            .where("\"" + Room.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + Room.getTableName() + "\".active = :active", {active: true})
            .andWhere("\"roomTemplate\".user = :user", {user: userId})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

}

export = RoomRepository;