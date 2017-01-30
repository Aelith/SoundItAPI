/**
 * Created by soundit on 17/01/2017.
 */


import DataAccessPostgres = require("../../dataAccess/postgres/DataAccessPostgres");
import BaseRepository = require("./BaseRepository");
import {RoomTemplate} from "../../model/postgres/RoomTemplate";

enum Property {
    Owner,
    KnownUsers,
    KnownUsersUser,
    KnownUsersUserGroup,
    KnownUsersUserGroupRoomRight,
    Events,
    EventsTags,
    Tags,
    Rooms
}


class RoomTemplateRepository extends BaseRepository<RoomTemplate> {

    public static readonly eProperty = Property;

    constructor() {
        super(RoomTemplate);
    }

    /********* ********/
    /**** Retrieve ****/
    /********* ********/

    retrieveHydrated (callback: (error: any, result: any) => any){
        DataAccessPostgres.connect()
            .getRepository(RoomTemplate)
            .createQueryBuilder(RoomTemplate.getTableName())
            .leftJoinAndSelect(RoomTemplate.getTableName() + ".user", "owner")
            .leftJoinAndSelect(RoomTemplate.getTableName() + ".knownUsers", "knownUsers")
            .leftJoinAndSelect("knownUsers.user", "user")
            .leftJoinAndSelect("knownUsers.userGroup", "userGroup")
            .leftJoinAndSelect("userGroup.roomRights", "roomRights")
            .leftJoinAndSelect(RoomTemplate.getTableName() + ".events", "events")
            .leftJoinAndSelect("events.tags", "eventTags")
            .leftJoinAndSelect(RoomTemplate.getTableName() + ".tags", "tags")
            .leftJoinAndSelect(RoomTemplate.getTableName() + ".rooms", "rooms")
            .where("\"" + RoomTemplate.getTableName() + "\".deleted = :deleted", {deleted: false})
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
            .getRepository(RoomTemplate)
            .createQueryBuilder(RoomTemplate.getTableName());

        if (fields.indexOf(Property.Owner) > -1) {
            QB.leftJoinAndSelect(RoomTemplate.getTableName() + ".user", "owner");
        }



        if (fields.indexOf(Property.KnownUsers) > -1 ||
            fields.indexOf(Property.KnownUsersUser) > -1 ||
            fields.indexOf(Property.KnownUsersUserGroup) > -1 ||
            fields.indexOf(Property.KnownUsersUserGroupRoomRight) > -1 ) {

            QB.leftJoinAndSelect(RoomTemplate.getTableName() + ".knownUsers", "knownUsers");

        }


        if (fields.indexOf(Property.KnownUsersUserGroupRoomRight) > -1) {
            QB
                .leftJoinAndSelect("knownUsers.userGroup", "userGroup")
                .leftJoinAndSelect("userGroup.roomRights", "roomRights");
        }
        else if (fields.indexOf(Property.KnownUsersUserGroup) > -1) {
            QB
                .leftJoinAndSelect("knownUsers.userGroup", "userGroup");
        }


        if (fields.indexOf(Property.KnownUsersUser) > -1) {
            QB
                .leftJoinAndSelect("knownUsers.user", "user");
        }



        if (fields.indexOf(Property.EventsTags) > -1) {
            QB
                .leftJoinAndSelect(RoomTemplate.getTableName() + ".events", "events")
                .leftJoinAndSelect("events.tags", "eventTags");
        }
        else if (fields.indexOf(Property.EventsTags) > -1) {
            QB
                .leftJoinAndSelect(RoomTemplate.getTableName() + ".events", "events");
        }



        if (fields.indexOf(Property.Tags) > -1) {
            QB
                .leftJoinAndSelect(RoomTemplate.getTableName() + ".tags", "tags");
        }

        if (fields.indexOf(Property.Rooms) > -1) {
            QB
                .leftJoinAndSelect(RoomTemplate.getTableName() + ".rooms", "rooms");
        }


        QB
            .where("\"" + RoomTemplate.getTableName() + "\".deleted = :deleted", {deleted: false})
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
            .getRepository(RoomTemplate)
            .createQueryBuilder(RoomTemplate.getTableName())
            .leftJoinAndSelect(RoomTemplate.getTableName() + ".user", "owner")
            .leftJoinAndSelect(RoomTemplate.getTableName() + ".knownUsers", "knownUsers")
            .leftJoinAndSelect("knownUsers.user", "user")
            .leftJoinAndSelect("knownUsers.userGroup", "userGroup")
            .leftJoinAndSelect("userGroup.roomRights", "roomRights")
            .leftJoinAndSelect(RoomTemplate.getTableName() + ".events", "events")
            .leftJoinAndSelect("events.tags", "eventTags")
            .leftJoinAndSelect(RoomTemplate.getTableName() + ".tags", "tags")
            .leftJoinAndSelect(RoomTemplate.getTableName() + ".rooms", "rooms")
            .where("\"" + RoomTemplate.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + RoomTemplate.getTableName() + "\".id = :id", {id: id})
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
            .getRepository(RoomTemplate)
            .createQueryBuilder(RoomTemplate.getTableName());

        if (fields.indexOf(Property.Owner) > -1) {
            QB.leftJoinAndSelect(RoomTemplate.getTableName() + ".user", "owner");
        }



        if (fields.indexOf(Property.KnownUsers) > -1 ||
            fields.indexOf(Property.KnownUsersUser) > -1 ||
            fields.indexOf(Property.KnownUsersUserGroup) > -1 ||
            fields.indexOf(Property.KnownUsersUserGroupRoomRight) > -1 ) {

            QB.leftJoinAndSelect(RoomTemplate.getTableName() + ".knownUsers", "knownUsers");

        }


        if (fields.indexOf(Property.KnownUsersUserGroupRoomRight) > -1) {
            QB
                .leftJoinAndSelect("knownUsers.userGroup", "userGroup")
                .leftJoinAndSelect("userGroup.roomRights", "roomRights");
        }
        else if (fields.indexOf(Property.KnownUsersUserGroup) > -1) {
            QB
                .leftJoinAndSelect("knownUsers.userGroup", "userGroup");
        }


        if (fields.indexOf(Property.KnownUsersUser) > -1) {
            QB
                .leftJoinAndSelect("knownUsers.user", "user");
        }



        if (fields.indexOf(Property.EventsTags) > -1) {
            QB
                .leftJoinAndSelect(RoomTemplate.getTableName() + ".events", "events")
                .leftJoinAndSelect("events.tags", "eventTags");
        }
        else if (fields.indexOf(Property.EventsTags) > -1) {
            QB
                .leftJoinAndSelect(RoomTemplate.getTableName() + ".events", "events");
        }



        if (fields.indexOf(Property.Tags) > -1) {
            QB
                .leftJoinAndSelect(RoomTemplate.getTableName() + ".tags", "tags");
        }

        if (fields.indexOf(Property.Rooms) > -1) {
            QB
                .leftJoinAndSelect(RoomTemplate.getTableName() + ".rooms", "rooms");
        }


        QB
            .where("\"" + RoomTemplate.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + RoomTemplate.getTableName() + "\".id = :id", {id: id})
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
            .getRepository(RoomTemplate)
            .createQueryBuilder(RoomTemplate.getTableName())
            .where("\"" + RoomTemplate.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + RoomTemplate.getTableName() + "\".user = :user", {user: userId})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findHydratedByUser (userId: number, callback: (error: any, result: any) => any){
        DataAccessPostgres.connect()
            .getRepository(RoomTemplate)
            .createQueryBuilder(RoomTemplate.getTableName())
            .leftJoinAndSelect(RoomTemplate.getTableName() + ".user", "owner")
            .leftJoinAndSelect(RoomTemplate.getTableName() + ".knownUsers", "knownUsers")
            .leftJoinAndSelect("knownUsers.user", "user")
            .leftJoinAndSelect("knownUsers.userGroup", "userGroup")
            .leftJoinAndSelect("userGroup.roomRights", "roomRights")
            .leftJoinAndSelect(RoomTemplate.getTableName() + ".events", "events")
            .leftJoinAndSelect("events.tags", "eventTags")
            .leftJoinAndSelect(RoomTemplate.getTableName() + ".tags", "tags")
            .leftJoinAndSelect(RoomTemplate.getTableName() + ".rooms", "rooms")
            .where("\"" + RoomTemplate.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + RoomTemplate.getTableName() + "\".user = :user", {user: userId})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findCustomHydratedByUser (userId: number, fields: Property[], callback: (error: any, result: any) => any){
        let QB = DataAccessPostgres.connect()
            .getRepository(RoomTemplate)
            .createQueryBuilder(RoomTemplate.getTableName());

        if (fields.indexOf(Property.Owner) > -1) {
            QB.leftJoinAndSelect(RoomTemplate.getTableName() + ".user", "owner");
        }



        if (fields.indexOf(Property.KnownUsers) > -1 ||
            fields.indexOf(Property.KnownUsersUser) > -1 ||
            fields.indexOf(Property.KnownUsersUserGroup) > -1 ||
            fields.indexOf(Property.KnownUsersUserGroupRoomRight) > -1 ) {

            QB.leftJoinAndSelect(RoomTemplate.getTableName() + ".knownUsers", "knownUsers");

        }


        if (fields.indexOf(Property.KnownUsersUserGroupRoomRight) > -1) {
            QB
                .leftJoinAndSelect("knownUsers.userGroup", "userGroup")
                .leftJoinAndSelect("userGroup.roomRights", "roomRights");
        }
        else if (fields.indexOf(Property.KnownUsersUserGroup) > -1) {
            QB
                .leftJoinAndSelect("knownUsers.userGroup", "userGroup");
        }


        if (fields.indexOf(Property.KnownUsersUser) > -1) {
            QB
                .leftJoinAndSelect("knownUsers.user", "user");
        }



        if (fields.indexOf(Property.EventsTags) > -1) {
            QB
                .leftJoinAndSelect(RoomTemplate.getTableName() + ".events", "events")
                .leftJoinAndSelect("events.tags", "eventTags");
        }
        else if (fields.indexOf(Property.EventsTags) > -1) {
            QB
                .leftJoinAndSelect(RoomTemplate.getTableName() + ".events", "events");
        }



        if (fields.indexOf(Property.Tags) > -1) {
            QB
                .leftJoinAndSelect(RoomTemplate.getTableName() + ".tags", "tags");
        }

        if (fields.indexOf(Property.Rooms) > -1) {
            QB
                .leftJoinAndSelect(RoomTemplate.getTableName() + ".rooms", "rooms");
        }


        QB
            .where("\"" + RoomTemplate.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("events.deleted = :deleted", {deleted: false})
            .andWhere("\"" + RoomTemplate.getTableName() + "\".user = :user", {user: userId})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }
}

export = RoomTemplateRepository;