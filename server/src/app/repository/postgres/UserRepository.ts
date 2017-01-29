/**
 * Created by soundit on 17/01/2017.
 */


import DataAccessPostgres = require("../../dataAccess/postgres/DataAccessPostgres");
import BaseRepository = require("./BaseRepository");
import {User} from "../../model/postgres/User";

enum Property {
    UserType,
    UseRights,
    LoginType,
    Addresses,
    Country,
    SubscriptionPackages,
    SubscriptionPackageState,
    SubscriptionPackageDetail,
    Tax,
    RoomTemplate
}

class UserRepository extends BaseRepository<User> {


    public static readonly eProperty = Property;


    constructor() {
        super(User);
    }


    /************  ***********/
    /******* Retrieve ********/
    /************  ***********/


    /**
     * Retrieve all User, fully Hydrated
     * @param callback
     */
    retrieveHydrated (callback: (error:any, result: any) => any) {

        DataAccessPostgres.connect()
            .getRepository(User)
            .createQueryBuilder(User.getTableName())
            .leftJoinAndSelect(User.getTableName() + ".userRights", "userRights")
            .leftJoinAndSelect(User.getTableName() + ".userType", "userType")
            .leftJoinAndSelect(User.getTableName() + ".loginType", "loginType")
            .leftJoinAndSelect(User.getTableName() + ".addresses", "addresses")
            .leftJoinAndSelect("addresses.country", "country")
            .leftJoinAndSelect(User.getTableName() + ".subscriptionPackages", "subscriptionPackages")
            .leftJoinAndSelect("subscriptionPackages.subscriptionPackageState", "subscriptionPackageState")
            .leftJoinAndSelect("subscriptionPackages.subscriptionPackageDetail", "subscriptionPackageDetail")
            .leftJoinAndSelect("subscriptionPackageDetail.tax", "tax")
            .leftJoinAndSelect(User.getTableName() + ".roomTemplates", "roomTemplates")
            .where("\"" + User.getTableName() + "\".deleted = :deleted", {deleted: false})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    /**
     * Retrieve all User, hydrated with chosen fields
     * @param fields
     * @param callback
     */
    retrieveCustomHydrated (fields: Property[], callback: (error: any, result: any) => any) {

        let QB = DataAccessPostgres.connect()
            .getRepository(User)
            .createQueryBuilder(User.getTableName());


        if (fields.indexOf(Property.LoginType) > -1 ) {
            QB.leftJoinAndSelect(User.getTableName() + ".loginType", "loginType");
        }
        if (fields.indexOf(Property.UserType) > -1 ) {
            QB.leftJoinAndSelect(User.getTableName() + ".userType", "userType");
        }
        if (fields.indexOf(Property.UseRights) > -1 ) {
            QB.leftJoinAndSelect(User.getTableName() + ".userRights", "userRights");
        }
        if (fields.indexOf(Property.RoomTemplate) > -1) {
            QB.leftJoinAndSelect(User.getTableName() + ".roomTemplates", "roomTemplates");
        }



        if (fields.indexOf(Property.Country) > -1) {
            QB
                .leftJoinAndSelect(User.getTableName() + ".addresses", "addresses")
                .leftJoinAndSelect("addresses.country", "country");
        }
        else if (fields.indexOf(Property.Addresses) > -1)
        {
            QB
                .leftJoinAndSelect(User.getTableName() + ".addresses", "addresses");
        }


        if (fields.indexOf(Property.Tax) > -1) {
            QB
                .leftJoinAndSelect(User.getTableName() + ".subscriptionPackages", "subscriptionPackages")
                .leftJoinAndSelect("subscriptionPackages.subscriptionPackageDetail", "subscriptionPackageDetail")
                .leftJoinAndSelect("subscriptionPackageDetail.tax", "tax");
        }
        else if (fields.indexOf(Property.SubscriptionPackageDetail) > -1)
        {
            QB
                .leftJoinAndSelect(User.getTableName() + ".subscriptionPackages", "subscriptionPackages")
                .leftJoinAndSelect("subscriptionPackages.subscriptionPackageDetail", "subscriptionPackageDetail");
        }
        else if (fields.indexOf(Property.SubscriptionPackages) > -1) {
            QB
                .leftJoinAndSelect(User.getTableName() + ".subscriptionPackages", "subscriptionPackages");
        }


        if (fields.indexOf(Property.SubscriptionPackageState) > -1 && (
            fields.indexOf(Property.SubscriptionPackages) === -1 &&
            fields.indexOf(Property.SubscriptionPackageDetail) === -1 &&
            fields.indexOf(Property.Tax) === -1
            ))
        {
            QB
                .leftJoinAndSelect(User.getTableName() + ".subscriptionPackages", "subscriptionPackages")
                .leftJoinAndSelect("subscriptionPackages.subscriptionPackageState", "subscriptionPackageState");
        }
        else if (fields.indexOf(Property.SubscriptionPackageState) > -1)
        {
            QB
                .leftJoinAndSelect("subscriptionPackages.subscriptionPackageState", "subscriptionPackageState");
        }


        QB
            .where("\"" + User.getTableName() + "\".deleted = :deleted", {deleted: false})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }


    /***********  ***********/
    /******** By Id *********/
    /***********  ***********/

    /**
     * Retrieve fully hydrated user by id
     * @param idUser
     * @param callback
     */
    findHydratedById (idUser: number, callback: (error:any, result: any) => any) {

        DataAccessPostgres.connect()
            .getRepository(User)
            .createQueryBuilder(User.getTableName())
            .leftJoinAndSelect(User.getTableName() + ".userRights", "userRights")
            .leftJoinAndSelect(User.getTableName() + ".userType", "userType")
            .leftJoinAndSelect(User.getTableName() + ".loginType", "loginType")
            .leftJoinAndSelect(User.getTableName() + ".addresses", "addresses")
            .leftJoinAndSelect("addresses.country", "country")
            .leftJoinAndSelect(User.getTableName() + ".subscriptionPackages", "subscriptionPackages")
            .leftJoinAndSelect("subscriptionPackages.subscriptionPackageState", "subscriptionPackageState")
            .leftJoinAndSelect("subscriptionPackages.subscriptionPackageDetail", "subscriptionPackageDetail")
            .leftJoinAndSelect("subscriptionPackageDetail.tax", "tax")
            .leftJoinAndSelect(User.getTableName() + ".roomTemplates", "roomTemplates")
            .where("\"" + User.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + User.getTableName() + "\".id = :idU", {idU: idUser})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
            callback(e, null);
        });
    }

    /**
     * Retrieve hydrated user with chosen fields by id
     * @param idUser
     * @param fields
     * @param callback
     */
    findCustomHydratedById (idUser: number, fields: Property[], callback: (error: any, result: any) => any) {

        let QB = DataAccessPostgres.connect()
            .getRepository(User)
            .createQueryBuilder(User.getTableName());


        if (fields.indexOf(Property.LoginType) > -1 ) {
            QB.leftJoinAndSelect(User.getTableName() + ".loginType", "loginType");
        }
        if (fields.indexOf(Property.UserType) > -1 ) {
            QB.leftJoinAndSelect(User.getTableName() + ".userType", "userType");
        }
        if (fields.indexOf(Property.UseRights) > -1 ) {
            QB.leftJoinAndSelect(User.getTableName() + ".userRights", "userRights");
        }
        if (fields.indexOf(Property.RoomTemplate) > -1) {
            QB.leftJoinAndSelect(User.getTableName() + ".roomTemplates", "roomTemplates");
        }



        if (fields.indexOf(Property.Country) > -1) {
            QB
                .leftJoinAndSelect(User.getTableName() + ".addresses", "addresses")
                .leftJoinAndSelect("addresses.country", "country");
        }
        else if (fields.indexOf(Property.Addresses) > -1)
        {
            QB
                .leftJoinAndSelect(User.getTableName() + ".addresses", "addresses");
        }


        if (fields.indexOf(Property.Tax) > -1) {
            QB
                .leftJoinAndSelect(User.getTableName() + ".subscriptionPackages", "subscriptionPackages")
                .leftJoinAndSelect("subscriptionPackages.subscriptionPackageDetail", "subscriptionPackageDetail")
                .leftJoinAndSelect("subscriptionPackageDetail.tax", "tax");
        }
        else if (fields.indexOf(Property.SubscriptionPackageDetail) > -1)
        {
            QB
                .leftJoinAndSelect(User.getTableName() + ".subscriptionPackages", "subscriptionPackages")
                .leftJoinAndSelect("subscriptionPackages.subscriptionPackageDetail", "subscriptionPackageDetail");
        }
        else if (fields.indexOf(Property.SubscriptionPackages) > -1) {
            QB
                .leftJoinAndSelect(User.getTableName() + ".subscriptionPackages", "subscriptionPackages");
        }


        if (fields.indexOf(Property.SubscriptionPackageState) > -1 && (
                fields.indexOf(Property.SubscriptionPackages) === -1 &&
                fields.indexOf(Property.SubscriptionPackageDetail) === -1 &&
                fields.indexOf(Property.Tax) === -1
            ))
        {
            QB
                .leftJoinAndSelect(User.getTableName() + ".subscriptionPackages", "subscriptionPackages")
                .leftJoinAndSelect("subscriptionPackages.subscriptionPackageState", "subscriptionPackageState");
        }
        else if (fields.indexOf(Property.SubscriptionPackageState) > -1)
        {
            QB
                .leftJoinAndSelect("subscriptionPackages.subscriptionPackageState", "subscriptionPackageState");
        }


        QB
            .where("\"" + User.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + User.getTableName() + "\".id = :idU", {idU: idUser})
            .getMany()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }




    /***********  ***********/
    /******* By login *******/
    /***********  ***********/

    /**
     * Retrieve playlists by login
     * @param login
     * @param callback
     */
    findByLogin (login: string, callback: (error: any, result: any) => any) {

        DataAccessPostgres.connect()
            .getRepository(User)
            .createQueryBuilder(User.getTableName())
            .where("\"" + User.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + User.getTableName() + "\".login = :login", {login: login})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    /**
     * Retrieve fully hydrated user by login
     * @param login
     * @param callback
     */
    findHydratedByLogin (login: string, callback: (error:any, result: any) => any) {

        DataAccessPostgres.connect()
            .getRepository(User)
            .createQueryBuilder(User.getTableName())
            .leftJoinAndSelect(User.getTableName() + ".userRights", "userRights")
            .leftJoinAndSelect(User.getTableName() + ".userType", "userType")
            .leftJoinAndSelect(User.getTableName() + ".loginType", "loginType")
            .leftJoinAndSelect(User.getTableName() + ".addresses", "addresses")
            .leftJoinAndSelect("addresses.country", "country")
            .leftJoinAndSelect(User.getTableName() + ".subscriptionPackages", "subscriptionPackages")
            .leftJoinAndSelect("subscriptionPackages.subscriptionPackageState", "subscriptionPackageState")
            .leftJoinAndSelect("subscriptionPackages.subscriptionPackageDetail", "subscriptionPackageDetail")
            .leftJoinAndSelect("subscriptionPackageDetail.tax", "tax")
            .leftJoinAndSelect(User.getTableName() + ".roomTemplates", "roomTemplates")
            .where("\"" + User.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + User.getTableName() + "\".login = :login", {login: login})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    /**
     * Retrieve hydrated user with chosen fields by login
     * @param login
     * @param fields
     * @param callback
     */
    findCustomHydratedByLogin (login: string, fields: Property[], callback: (error: any, result: any) => any) {

        let QB = DataAccessPostgres.connect()
            .getRepository(User)
            .createQueryBuilder(User.getTableName());


        if (fields.indexOf(Property.LoginType) > -1 ) {
            QB.leftJoinAndSelect(User.getTableName() + ".loginType", "loginType");
        }
        if (fields.indexOf(Property.UserType) > -1 ) {
            QB.leftJoinAndSelect(User.getTableName() + ".userType", "userType");
        }
        if (fields.indexOf(Property.UseRights) > -1 ) {
            QB.leftJoinAndSelect(User.getTableName() + ".userRights", "userRights");
        }
        if (fields.indexOf(Property.RoomTemplate) > -1) {
            QB.leftJoinAndSelect(User.getTableName() + ".roomTemplates", "roomTemplates");
        }



        if (fields.indexOf(Property.Country) > -1) {
            QB
                .leftJoinAndSelect(User.getTableName() + ".addresses", "addresses")
                .leftJoinAndSelect("addresses.country", "country");
        }
        else if (fields.indexOf(Property.Addresses) > -1)
        {
            QB
                .leftJoinAndSelect(User.getTableName() + ".addresses", "addresses");
        }


        if (fields.indexOf(Property.Tax) > -1) {
            QB
                .leftJoinAndSelect(User.getTableName() + ".subscriptionPackages", "subscriptionPackages")
                .leftJoinAndSelect("subscriptionPackages.subscriptionPackageDetail", "subscriptionPackageDetail")
                .leftJoinAndSelect("subscriptionPackageDetail.tax", "tax");
        }
        else if (fields.indexOf(Property.SubscriptionPackageDetail) > -1)
        {
            QB
                .leftJoinAndSelect(User.getTableName() + ".subscriptionPackages", "subscriptionPackages")
                .leftJoinAndSelect("subscriptionPackages.subscriptionPackageDetail", "subscriptionPackageDetail");
        }
        else if (fields.indexOf(Property.SubscriptionPackages) > -1) {
            QB
                .leftJoinAndSelect(User.getTableName() + ".subscriptionPackages", "subscriptionPackages");
        }


        if (fields.indexOf(Property.SubscriptionPackageState) > -1 && (
                fields.indexOf(Property.SubscriptionPackages) === -1 &&
                fields.indexOf(Property.SubscriptionPackageDetail) === -1 &&
                fields.indexOf(Property.Tax) === -1
            ))
        {
            QB
                .leftJoinAndSelect(User.getTableName() + ".subscriptionPackages", "subscriptionPackages")
                .leftJoinAndSelect("subscriptionPackages.subscriptionPackageState", "subscriptionPackageState");
        }
        else if (fields.indexOf(Property.SubscriptionPackageState) > -1)
        {
            QB
                .leftJoinAndSelect("subscriptionPackages.subscriptionPackageState", "subscriptionPackageState");
        }


        QB
            .where("\"" + User.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + User.getTableName() + "\".login = :login", {login: login})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }


}

export = UserRepository;