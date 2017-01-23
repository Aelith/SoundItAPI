/**
 * Created by Soundit on 15-06-2016.
 */

import Read = require("../common/Read");
import Write = require("../common/Write");
import PostgresModel = require("../../model/postgres/interfaces/PostgresModel");
import logger = require("../../../tools/Logger");

abstract class BaseBusiness<T extends PostgresModel> implements Read<T>, Write<T> {

    protected entity;

    constructor(entity: new() => T) {
        this.entity = entity;
    }

    retrieve (callback: (error: any, result: T)=> void){};

    findById (_id: number, callback: (error:any, result: T) => void){};

    create (item: T, callback: (error: any, result: any ) => void){};

    update(item: T, callback: (error: any, result: any)=> void){};

    delete (item: T, callback: (error: any, result: any) => void){
        try {
            this.entity = item;
            this.entity.deleted = true;
            this.update(this.entity, callback);
        }
        catch(e){
            logger.error("delete : error", {"error": e});
        }
    };

};
export = BaseBusiness;