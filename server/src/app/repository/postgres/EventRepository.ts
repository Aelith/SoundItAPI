/**
 * Created by soundit on 17/01/2017.
 */


import DataAccessPostgres = require("../../dataAccess/postgres/DataAccessPostgres");
import BaseRepository = require("./BaseRepository");
import {Event} from "../../model/postgres/Event";


enum Property{
    Tags,
    RoomTemplate
}

class EventRepository extends BaseRepository<Event> {

    public static readonly eProperty = Property;

    constructor() {
        super(Event);
    }


    /********* ********/
    /**** Retrieve ****/
    /********* ********/

    retrieveHydrated (callback: (error: any, result: any) => any){
        DataAccessPostgres.connect()
            .getRepository(Event)
            .createQueryBuilder(Event.getTableName())
            .leftJoinAndSelect(Event.getTableName() + ".tags", "tags")
            .leftJoinAndSelect(Event.getTableName() + ".roomTemplate", "roomTemplate")
            .where("\"" + Event.getTableName() + "\".deleted = :deleted", {deleted: false})
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
            .getRepository(Event)
            .createQueryBuilder(Event.getTableName());


        if (fields.indexOf(Property.Tags) > -1) {
            QB
                .leftJoinAndSelect(Event.getTableName() + ".tags", "tags");
        }

        if (fields.indexOf(Property.RoomTemplate) > -1) {
            QB
                .leftJoinAndSelect(Event.getTableName() + ".roomTemplate", "roomTemplate");
        }


        QB
            .where("\"" + Event.getTableName() + "\".deleted = :deleted", {deleted: false})
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
            .getRepository(Event)
            .createQueryBuilder(Event.getTableName())
            .leftJoinAndSelect(Event.getTableName() + ".tags", "tags")
            .leftJoinAndSelect(Event.getTableName() + ".roomTemplate", "roomTemplate")
            .where("\"" + Event.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + Event.getTableName() + "\".id = :id", {id: id})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findCustomHydratedById (id: number, fields: Property[], callback: (error: any, result: any) => any){
        let QB = DataAccessPostgres.connect()
            .getRepository(Event)
            .createQueryBuilder(Event.getTableName());


        if (fields.indexOf(Property.Tags) > -1) {
            QB
                .leftJoinAndSelect(Event.getTableName() + ".tags", "tags");
        }

        if (fields.indexOf(Property.RoomTemplate) > -1) {
            QB
                .leftJoinAndSelect(Event.getTableName() + ".roomTemplate", "roomTemplate");
        }


        QB
            .where("\"" + Event.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + Event.getTableName() + "\".id = :id", {id: id})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }



    /************ *************/
    /*** Retrieve "To Come" ***/
    /************ *************/

    retrieveToCome (callback: (error: any, result: any) => any){

        DataAccessPostgres.connect()
            .getRepository(Event)
            .createQueryBuilder(Event.getTableName())
            .where("\"" + Event.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("date_trunc('day', \"" + Event.getTableName() + "\".\"eventDate\") >= current_date")
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    retrieveToComeHydrated (callback: (error: any, result: any) => any){
        DataAccessPostgres.connect()
            .getRepository(Event)
            .createQueryBuilder(Event.getTableName())
            .leftJoinAndSelect(Event.getTableName() + ".tags", "tags")
            .leftJoinAndSelect(Event.getTableName() + ".roomTemplate", "roomTemplate")
            .where("\"" + Event.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("date_trunc('day', \"" + Event.getTableName() + "\".\"eventDate\") >= current_date")
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    retrieveToComeCustomHydrated (fields: Property[], callback: (error: any, result: any) => any){
        let QB = DataAccessPostgres.connect()
            .getRepository(Event)
            .createQueryBuilder(Event.getTableName());


        if (fields.indexOf(Property.Tags) > -1) {
            QB
                .leftJoinAndSelect(Event.getTableName() + ".tags", "tags");
        }

        if (fields.indexOf(Property.RoomTemplate) > -1) {
            QB
                .leftJoinAndSelect(Event.getTableName() + ".roomTemplate", "roomTemplate");
        }


        QB
            .where("\"" + Event.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("date_trunc('day', \"" + Event.getTableName() + "\".\"eventDate\") >= current_date")
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }


    /************* **************/
    /*** Find "To Come" By Id ***/
    /************* **************/

    findToComeById (id: number, callback: (error: any, result: any) => any){
        DataAccessPostgres.connect()
            .getRepository(Event)
            .createQueryBuilder(Event.getTableName())
            .where("\"" + Event.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + Event.getTableName() + "\".id = :id", {id: id})
            .andWhere("date_trunc('day', \"" + Event.getTableName() + "\".\"eventDate\") >= current_date")
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findToComeHydratedById (id: number, callback: (error: any, result: any) => any){
        DataAccessPostgres.connect()
            .getRepository(Event)
            .createQueryBuilder(Event.getTableName())
            .leftJoinAndSelect(Event.getTableName() + ".tags", "tags")
            .leftJoinAndSelect(Event.getTableName() + ".roomTemplate", "roomTemplate")
            .where("\"" + Event.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + Event.getTableName() + "\".id = :id", {id: id})
            .andWhere("date_trunc('day', \"" + Event.getTableName() + "\".\"eventDate\") >= current_date")
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findToComeCustomHydratedById (id: number, fields: Property[], callback: (error: any, result: any) => any){
        let QB = DataAccessPostgres.connect()
            .getRepository(Event)
            .createQueryBuilder(Event.getTableName());


        if (fields.indexOf(Property.Tags) > -1) {
            QB
                .leftJoinAndSelect(Event.getTableName() + ".tags", "tags");
        }

        if (fields.indexOf(Property.RoomTemplate) > -1) {
            QB
                .leftJoinAndSelect(Event.getTableName() + ".roomTemplate", "roomTemplate");
        }


        QB
            .where("\"" + Event.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + Event.getTableName() + "\".id = :id", {id: id})
            .andWhere("date_trunc('day', \"" + Event.getTableName() + "\".\"eventDate\") >= current_date")
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

}

export = EventRepository;