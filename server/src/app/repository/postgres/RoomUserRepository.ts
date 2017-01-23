/**
 * Created by soundit on 17/01/2017.
 */


import DataAccessPostgres = require("../../dataAccess/postgres/DataAccessPostgres");
import BaseRepository = require("./BaseRepository");
import {RoomUser} from "../../model/postgres/RoomUser";


class RoomUserRepository extends BaseRepository<RoomUser> {

    constructor() {
        super(RoomUser);
    }

    findById (id: number, callback: (error: any, result: any) => any)
    {
        return "";
    }


    findByIds (idRoom: number, idUser: number, callback: (error: any, result: any) => any)
    {
        DataAccessPostgres.connect()
            .getRepository(RoomUser)
            .createQueryBuilder(RoomUser.getTableName())
            .where("\"" + RoomUser.getTableName() + "\".room = :idR", {idR: idRoom})
            .andWhere("\"" + RoomUser.getTableName() + "\".user = :idU", {idU: idUser})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findByUserId (idUser: number, callback: (error: any, result: any) => any)
    {
        DataAccessPostgres.connect()
            .getRepository(RoomUser)
            .createQueryBuilder(RoomUser.getTableName())
            .where("\"" + RoomUser.getTableName() + "\".user = :idU", {idU: idUser})
            .getOne()
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
            .getRepository(RoomUser)
            .createQueryBuilder(RoomUser.getTableName())
            .where("\"" + RoomUser.getTableName() + "\".room = :idR", {idR: idRoom})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

}

export = RoomUserRepository;