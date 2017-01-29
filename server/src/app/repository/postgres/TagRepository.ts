/**
 * Created by soundit on 17/01/2017.
 */


import DataAccessPostgres = require("../../dataAccess/postgres/DataAccessPostgres");
import BaseRepository = require("./BaseRepository");
import {Tag} from "../../model/postgres/Tag";


class TagRepository extends BaseRepository<Tag> {

    constructor() {
        super(Tag);
    }

    /**
     * Get one entity by his id
     * @param id
     * @param callback Callback : first param is error (null if succeeded), second is an entity (undefined if no result, or null if error)
     */
    findByLabel(label: string, callback: (error: any, result: any) => void) {

        DataAccessPostgres.connect()
            .getRepository(Tag)
            .createQueryBuilder(Tag.getTableName())
            .where("\"" + Tag.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("lower(\"" + Tag.getTableName() + "\".label) = lower(:label)", {label: label})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

}

export = TagRepository;