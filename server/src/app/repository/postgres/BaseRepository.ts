/**
 * Created by soundit on 17/01/2017.
 */

import "reflect-metadata";
import Read = require("./interfaces/Read");
import Write = require("./interfaces/Write");
import PostgresModel = require("./../../model/postgres/interfaces/PostgresModel");
import DataAccessPostgres = require("./../../dataAccess/postgres/DataAccessPostgres");


class BaseRepository<T extends PostgresModel> implements  Read<T>, Write<T> {

    private entity;

    constructor(entity: new() => T) {
        this.entity = entity;
    }


    /**
     * Get one entity by his id
     * @param id
     * @param callback Callback : first param is error (null if succeeded), second is an entity (undefined if no result, or null if error)
     */
    findById(id: number, callback: (error: any, result: any) => void) {

        DataAccessPostgres.connect()
            .getRepository(this.entity)
            .createQueryBuilder(this.entity.getTableName())
            .where("\"" + this.entity.getTableName() + "\".id = :id", {id: id})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }


    /**
     * Retrieve all entities from database
     * @param callback Callback : first param is error (null if succeeded), second is an entity array (empty if no result, or null if error)
     */
    retrieve (callback: (error: any, result: any) => void) : void {

        DataAccessPostgres.connect()
            .getRepository(this.entity)
            .find()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }


    /**
     * Insert object into database
     * @param item Object to save
     * @param callback Callback : first param is error (null if succeeded), second is saved entity (or null if error)
     */
    create (item: T, callback: (error: any, result: any) => void) : void {
        DataAccessPostgres.connect()
            .getRepository(this.entity)
            .persist(item)
            .then( (entity) => {
                callback(null, entity);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    /**
     * Update object into database
     * @param id Id of the object to update
     * @param item Object to save
     * @param callback Callback : first param is error (null if succeeded), second is saved entity (or null if error)
     */
    update (item: T, callback: (error: any, result: any) => void) : void {
        DataAccessPostgres.connect()
            .getRepository(this.entity)
            .persist(item)
            .then( (entity) => {
                callback(null, entity);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    /**
     * Delete object from database
     * @param item Object to delete
     * @param callback Callback : first param is error (null if succeeded), second is boolean (true if succeed, null if error)
     */
    delete (item: T, callback: (error: any, result: any) => void) : void {
        DataAccessPostgres.connect()
            .getRepository(this.entity)
            .remove(item)
            .then( (entity) => {
                callback(null, true);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    /**
     * Delete object from database
     * @param id Id of the object to delete
     * @param callback Callback : first param is error (null if succeeded), second is boolean (true if succeed, null if error)
     */
    deleteById (id: number, callback: (error: any, result: any) => void) : void {
        DataAccessPostgres.connect()
            .getRepository(this.entity)
            .findOneById(id)
            .then(entityToDelete => {
                DataAccessPostgres.connect()
                    .getRepository(this.entity)
                    .remove(entityToDelete)
                    .then( (entity) => {
                        callback(null, true);
                    })
                    .catch(e => {
                        callback(e, null);
                    });
            })
            .catch(e => {
                callback(e, null);
            });
    }

}

export = BaseRepository;