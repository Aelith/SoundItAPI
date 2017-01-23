/**
 * Created by soundit on 17/01/2017.
 */


import DataAccessPostgres = require("../../dataAccess/postgres/DataAccessPostgres");
import BaseRepository = require("./BaseRepository");
import {SubscriptionPackage} from "../../model/postgres/SubscriptionPackage";


class SubscriptionPackageRepository extends BaseRepository<SubscriptionPackage> {

    constructor() {
        super(SubscriptionPackage);
    }

    findById (id: number, callback: (error: any, result: any) => any)
    {
        return "";
    }

    findByIds (idSubscriptionPackageDetail: number, idSubscriptionPackageState: number, idUser: number, callback: (error: any, result: any) => any)
    {
        DataAccessPostgres.connect()
            .getRepository(SubscriptionPackage)
            .createQueryBuilder(SubscriptionPackage.getTableName())
            .where("\"" + SubscriptionPackage.getTableName() + "\".subscriptionPackageDetail = :idSPD", {idSPD: idSubscriptionPackageDetail})
            .andWhere("\"" + SubscriptionPackage.getTableName() + "\".subscriptionPackageState = :idSPS", {idSPS: idSubscriptionPackageState})
            .andWhere("\"" + SubscriptionPackage.getTableName() + "\".user = :idU", {idU: idUser})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findBySubscriptionPackageDetailId (idSubscriptionPackageDetail: number, callback: (error: any, result: any) => any)
    {
        DataAccessPostgres.connect()
            .getRepository(SubscriptionPackage)
            .createQueryBuilder(SubscriptionPackage.getTableName())
            .where("\"" + SubscriptionPackage.getTableName() + "\".subscriptionPackageDetail = :idSPD", {idSPD: idSubscriptionPackageDetail})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    findBySubscriptionPackageStateId (idSubscriptionPackageState: number, callback: (error: any, result: any) => any)
    {
        DataAccessPostgres.connect()
            .getRepository(SubscriptionPackage)
            .createQueryBuilder(SubscriptionPackage.getTableName())
            .where("\"" + SubscriptionPackage.getTableName() + "\".subscriptionPackageState = :idSPS", {idSPS: idSubscriptionPackageState})
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
            .getRepository(SubscriptionPackage)
            .createQueryBuilder(SubscriptionPackage.getTableName())
            .where("\"" + SubscriptionPackage.getTableName() + "\".user = :idU", {idU: idUser})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

}

export = SubscriptionPackageRepository;