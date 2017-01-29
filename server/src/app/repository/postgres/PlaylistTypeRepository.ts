/**
 * Created by soundit on 17/01/2017.
 */


import DataAccessPostgres = require("../../dataAccess/postgres/DataAccessPostgres");
import BaseRepository = require("./BaseRepository");
import {PlaylistType} from "../../model/postgres/PlaylistType";


class PlaylistTypeRepository extends BaseRepository<PlaylistType> {

    constructor() {
        super(PlaylistType);
    }

    findByLabel(label: string, callback: (error: any, result: any) => void) {
        DataAccessPostgres.connect()
            .getRepository(PlaylistType)
            .createQueryBuilder(PlaylistType.getTableName())
            .where("\"" + PlaylistType.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + PlaylistType.getTableName() + "\".label = :label", {label: label})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

}

export = PlaylistTypeRepository;